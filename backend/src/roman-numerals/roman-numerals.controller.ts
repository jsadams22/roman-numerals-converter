import { Controller, Get, ParseIntPipe, Query } from '@nestjs/common';
import { IntRangePipe } from './pipes/int-range.pipe';

@Controller('romannumeral')
export class RomanNumeralsController {
    /**
     * The `romannumeral` endpoint expects to receive a single integer query parameter named `query` that will be
     * converted to a roman numeral and returned, along with the input.
     * @param query Must be an integer between 1 and 3999. If not, a 400 Bad Request will be returned
     */
    @Get()
    convertToRoman(@Query('query', ParseIntPipe, new IntRangePipe(1, 3999)) query: string) {
        console.log(`Got query for ${query}`);
        return query;
    }
}
