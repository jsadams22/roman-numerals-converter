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
});
