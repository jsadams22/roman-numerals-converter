import { Module } from '@nestjs/common';
import { RomanNumeralsController } from './roman-numerals.controller';

@Module({
    controllers: [RomanNumeralsController],
})
export class RomanNumeralsModule {}
