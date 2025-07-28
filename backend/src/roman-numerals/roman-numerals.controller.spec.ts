import { Test, TestingModule } from '@nestjs/testing';
import { RomanNumeralsController } from './roman-numerals.controller';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { LoggerService } from '@nestjs/common';
import { createMock } from '@golevelup/ts-jest';

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
            ],
        }).compile();

        controller = module.get<RomanNumeralsController>(RomanNumeralsController);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });
});
