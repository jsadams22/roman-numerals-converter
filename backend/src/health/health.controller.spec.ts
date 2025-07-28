import { Test, TestingModule } from '@nestjs/testing';
import { HealthController } from './health.controller';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { createMock } from '@golevelup/ts-jest';
import { LoggerService } from '@nestjs/common';

describe('HealthController', () => {
    let controller: HealthController;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [HealthController],
            providers: [
                {
                    provide: WINSTON_MODULE_PROVIDER,
                    useValue: createMock<LoggerService>(),
                },
            ],
        }).compile();

        controller = module.get<HealthController>(HealthController);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });

    it('should return OK', () => {
        expect(controller.getHealth()).toBe('OK');
    });
});
