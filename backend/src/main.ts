import tracer from './tracer';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';

async function bootstrap() {
    tracer.start();
    const app = await NestFactory.create(AppModule);

    // Override the default NestJS logger with the one from Winston
    app.useLogger(app.get(WINSTON_MODULE_NEST_PROVIDER));

    app.enableCors({
        allowedHeaders: '*',
        origin: '*',
        exposedHeaders: '*',
        credentials: true,
    });

    await app.listen(process.env.PORT ?? 3000);
}

void bootstrap();
