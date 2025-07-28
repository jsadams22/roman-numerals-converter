import { Test, TestingModule } from '@nestjs/testing';
import { RomanNumeralsConverterService } from './roman-numerals-converter.service';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { createMock } from '@golevelup/ts-jest';
import { LoggerService } from '@nestjs/common';

describe('RomanNumeralsConverterService', () => {
    let service: RomanNumeralsConverterService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                RomanNumeralsConverterService,
                {
                    provide: WINSTON_MODULE_PROVIDER,
                    useValue: createMock<LoggerService>(),
                },
            ],
        }).compile();

        service = module.get<RomanNumeralsConverterService>(RomanNumeralsConverterService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    describe('convertToRoman', () => {
        it('should convert single digit numbers correctly', () => {
            expect(service.convertToRoman(1)).toBe('I');
            expect(service.convertToRoman(2)).toBe('II');
            expect(service.convertToRoman(3)).toBe('III');
            expect(service.convertToRoman(4)).toBe('IV');
            expect(service.convertToRoman(5)).toBe('V');
            expect(service.convertToRoman(6)).toBe('VI');
            expect(service.convertToRoman(7)).toBe('VII');
            expect(service.convertToRoman(8)).toBe('VIII');
            expect(service.convertToRoman(9)).toBe('IX');
        });

        it('should convert double digit numbers correctly', () => {
            expect(service.convertToRoman(10)).toBe('X');
            expect(service.convertToRoman(20)).toBe('XX');
            expect(service.convertToRoman(30)).toBe('XXX');
            expect(service.convertToRoman(40)).toBe('XL');
            expect(service.convertToRoman(50)).toBe('L');
            expect(service.convertToRoman(60)).toBe('LX');
            expect(service.convertToRoman(70)).toBe('LXX');
            expect(service.convertToRoman(80)).toBe('LXXX');
            expect(service.convertToRoman(90)).toBe('XC');

            // Spot check a few other double-digit numbers
            expect(service.convertToRoman(11)).toBe('XI');
            expect(service.convertToRoman(12)).toBe('XII');
            expect(service.convertToRoman(13)).toBe('XIII');
            expect(service.convertToRoman(14)).toBe('XIV');
            expect(service.convertToRoman(15)).toBe('XV');
            expect(service.convertToRoman(33)).toBe('XXXIII');
            expect(service.convertToRoman(42)).toBe('XLII');
            expect(service.convertToRoman(56)).toBe('LVI');
        });

        it('should convert triple digit numbers correctly', () => {
            expect(service.convertToRoman(100)).toBe('C');
            expect(service.convertToRoman(200)).toBe('CC');
            expect(service.convertToRoman(300)).toBe('CCC');
            expect(service.convertToRoman(400)).toBe('CD');
            expect(service.convertToRoman(500)).toBe('D');
            expect(service.convertToRoman(600)).toBe('DC');
            expect(service.convertToRoman(700)).toBe('DCC');
            expect(service.convertToRoman(800)).toBe('DCCC');
            expect(service.convertToRoman(900)).toBe('CM');

            // Spot check a few other 3 digit numbers
            expect(service.convertToRoman(101)).toBe('CI');
            expect(service.convertToRoman(102)).toBe('CII');
            expect(service.convertToRoman(444)).toBe('CDXLIV');
        });

        it('should convert four digit numbers correctly', () => {
            expect(service.convertToRoman(1000)).toBe('M');
            expect(service.convertToRoman(2000)).toBe('MM');
            expect(service.convertToRoman(3000)).toBe('MMM');
        });

        it('should handle complex numbers correctly', () => {
            expect(service.convertToRoman(1994)).toBe('MCMXCIV');
            expect(service.convertToRoman(2023)).toBe('MMXXIII');
            expect(service.convertToRoman(3549)).toBe('MMMDXLIX');
        });

        it('should handle boundary values', () => {
            // Testing lower boundary
            expect(service.convertToRoman(1)).toBe('I');
            // Testing upper boundary
            expect(service.convertToRoman(3999)).toBe('MMMCMXCIX');
        });

        it('should handle repeated numerals correctly', () => {
            expect(service.convertToRoman(3)).toBe('III');
            expect(service.convertToRoman(30)).toBe('XXX');
            expect(service.convertToRoman(300)).toBe('CCC');
            expect(service.convertToRoman(3000)).toBe('MMM');
        });

        it('should throw an error when the input is longer than 4 digits', () => {
            expect(() => service.convertToRoman(10000)).toThrow();
        });
    });
});
