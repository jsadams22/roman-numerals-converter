import { Test, TestingModule } from '@nestjs/testing';
import { RomanNumeralsController } from './roman-numerals.controller';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { LoggerService } from '@nestjs/common';
import { createMock } from '@golevelup/ts-jest';
import { RomanNumeralsConverterService } from './services/roman-numerals-converter.service';

const mockConverterService = {
    convertToRoman: jest.fn(() => 'XLII'),
};

describe('RomanNumeralsController', () => {
    let controller: RomanNumeralsController;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [RomanNumeralsController],
            providers: [
                {
                    provide: WINSTON_MODULE_PROVIDER,
                    useValue: createMock<LoggerService>(),
                },
                {
                    provide: RomanNumeralsConverterService,
                    useValue: mockConverterService,
                },
            ],
        }).compile();

        controller = module.get<RomanNumeralsController>(RomanNumeralsController);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });

    // These tests notably DO NOT check the input validation (input is a number, is within range 1-3999), because of
    // the way that NestJS handles parameter decorators. Those get bypassed by direct tests like this. See the
    // E2E tests for checking for those things.
    describe('convertToRoman', () => {
        it('should convert number to roman numeral', () => {
            const input = 92;

            const result = controller.convertToRoman(input);

            expect(result).toEqual({
                input: '92',
                output: 'XLII',
            });
            expect(mockConverterService.convertToRoman).toHaveBeenCalledWith(input);
        });

        it('should return correct response structure', () => {
            const result = controller.convertToRoman(50);

            // See model/conversion-result.ts
            expect(result).toHaveProperty('input');
            expect(result).toHaveProperty('output');
            expect(typeof result.input).toBe('string');
            expect(typeof result.output).toBe('string');
        });

        it('should handle different input values', () => {
            // Arrange
            const testCases = [1, 49, 99, 3999];

            // Act & Assert
            testCases.forEach((input) => {
                const result = controller.convertToRoman(input);
                expect(result.input).toBe(input.toString());
                expect(mockConverterService.convertToRoman).toHaveBeenCalledWith(input);
            });
        });
    });
});
