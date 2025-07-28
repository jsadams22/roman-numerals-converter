import {
    BadRequestException,
    Controller,
    Get,
    Inject,
    InternalServerErrorException,
    ParseIntPipe,
    Query,
} from '@nestjs/common';
import { IntRangePipe } from './pipes/int-range.pipe';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';
import { ConversionResult } from './model/conversion-result';
import { RomanNumeralsConverterService } from './services/roman-numerals-converter.service';

@Controller('romannumeral')
export class RomanNumeralsController {
    constructor(
        private readonly converterService: RomanNumeralsConverterService,
        @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
    ) {}

    /**
     * The `romannumeral` endpoint expects to receive a single integer query parameter named `query` that will be
     * converted to a roman numeral and returned, along with the input.
     * @param query Must be an integer between 1 and 3999. If not, a 400 Bad Request will be returned
     */
    @Get()
    public convertToRoman(@Query('query', ParseIntPipe, new IntRangePipe(1, 3999)) query: number): ConversionResult {
        this.logger.debug(`Got query for ${query}`);

        let romanNumeral = '';
        try {
            // Perform conversion to roman numerals
            romanNumeral = this.converterService.convertToRoman(query);
        } catch (error) {
            if (error instanceof RangeError) {
                // Handle range errors; these shouldn't happen, since our validators on the query parameter should catch this case
                this.logger.error(`Input ${query} is out of range and was not caught by input validators!`);
                throw new BadRequestException(error.message);
            } else {
                throw new InternalServerErrorException(error);
            }
        }

        // TODO: Handle any errors from the conversion

        // Fill out the response object for the API
        this.logger.info(`Converted ${query} to ${romanNumeral}`);
        return {
            input: query.toString(),
            output: romanNumeral.toString(),
        };
    }
}
