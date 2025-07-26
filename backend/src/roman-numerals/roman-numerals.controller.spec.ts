import { Test, TestingModule } from '@nestjs/testing';
import { RomanNumeralsController } from './roman-numerals.controller';

describe('RomanNumeralsController', () => {
    let controller: RomanNumeralsController;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [RomanNumeralsController],
        }).compile();

        controller = module.get<RomanNumeralsController>(RomanNumeralsController);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });
});
