import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { RomanNumeralsModule } from './roman-numerals/roman-numerals.module';
import { WinstonModule, utilities as nestWinstonUtilities } from 'nest-winston';
import { HealthModule } from './health/health.module';
import * as winston from 'winston';

@Module({
    imports: [
        WinstonModule.forRoot({
            level: 'debug',
            transports: [
                new winston.transports.Console({
                    format: winston.format.combine(
                        winston.format.timestamp(),
                        winston.format.ms(),
                        nestWinstonUtilities.format.nestLike('roman-numerals-service', {
                            prettyPrint: true,
                            colors: true,
                            processId: true,
                            appName: true,
                        }),
                    ),
                }),
            ],
        }),
        ServeStaticModule.forRoot({
            rootPath: join(__dirname, '..', '..', 'frontend', 'dist'),
            exclude: ['/romannumeral', '/health'],
        }),
        RomanNumeralsModule,
        HealthModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
