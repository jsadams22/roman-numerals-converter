import { Module } from '@nestjs/common';
import { RomanNumeralsController } from './roman-numerals.controller';
import { RomanNumeralsConverterService } from './services/roman-numerals-converter.service';

@Module({
    controllers: [RomanNumeralsController],
    providers: [RomanNumeralsConverterService],
})
export class RomanNumeralsModule {}
