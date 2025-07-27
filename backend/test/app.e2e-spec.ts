import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { App } from 'supertest/types';
import { AppModule } from '../src/app.module';

describe('AppController (e2e)', () => {
    let app: INestApplication<App>;

    beforeEach(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
        }).compile();

        app = moduleFixture.createNestApplication();
        await app.init();
    });

    it('/ (GET)', () => {
        return request(app.getHttpServer()).get('/').expect(200).expect('Hello World!');
    });

    describe('/romannumeral (GET)', () => {
        describe('when the query parameter is not valid', () => {
            it('returns a bad request when the query parameter is missing', () => {
                return request(app.getHttpServer()).get('/romannumeral').expect(400);
            });

            it('returns a bad request when the query parameter is empty', () => {
                return request(app.getHttpServer()).get('/romannumeral?query=').expect(400);
            });

            it('returns a bad request when the query parameter is a float', () => {
                return request(app.getHttpServer()).get('/romannumeral?query=1.1').expect(400);
            });

            it('returns a bad request when the query parameter is a negative number', () => {
                return request(app.getHttpServer()).get('/romannumeral?query=-1').expect(400);
            });

            it('returns a bad request when the query parameter is a number greater than 3999', () => {
                return request(app.getHttpServer()).get('/romannumeral?query=4000').expect(400);
            });

            it('returns a bad request when the query parameter is a string', () => {
                return request(app.getHttpServer()).get('/romannumeral?query=abc').expect(400);
            });
        });

        describe('when the query parameter is valid', () => {
            it('returns OK when the query parameter is at the lower limit', () => {
                return request(app.getHttpServer()).get('/romannumeral?query=1').expect(200);
            });

            it('returns OK when the query parameter is at the upper limit', () => {
                return request(app.getHttpServer()).get('/romannumeral?query=3999').expect(200);
            });

            it('returns OK when the query parameter is in the middle', () => {
                return request(app.getHttpServer()).get('/romannumeral?query=1500').expect(200);
            });
        });
    });
});
