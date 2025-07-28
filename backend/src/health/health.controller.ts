import { Controller, Get, Inject } from '@nestjs/common';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';

@Controller('health')
export class HealthController {
    constructor(@Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger) {}

    @Get()
    getHealth() {
        // This is a little more log-heavy than I would probably be in a normal application; I would probably not log
        // anything here unless the health check was doing something interesting, like pinging a database or some other
        // resource. This is here for something interesting to see in metrics/traces.
        this.logger.debug('Responding to health check');
        return 'OK';
    }
}
