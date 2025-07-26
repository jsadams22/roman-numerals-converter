import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { RomanNumeralsModule } from './roman-numerals/roman-numerals.module';

@Module({
    imports: [
        ServeStaticModule.forRoot({
            rootPath: join(__dirname, '..', '..', 'frontend', 'dist'),
            exclude: ['/romannumeral*', '/health*'],
        }),
        RomanNumeralsModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
