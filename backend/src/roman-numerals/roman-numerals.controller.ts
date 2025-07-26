import { Controller, Get, Query } from '@nestjs/common';

@Controller('romannumeral')
export class RomanNumeralsController {
    @Get()
    convertToRoman(@Query('query') query: string) {
        console.log(`Got query for ${query}`);
    }
}
