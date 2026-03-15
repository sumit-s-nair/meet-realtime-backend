import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { App } from 'supertest/types';
import { AppModule } from './../src/app.module';

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
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect((res) => {
        expect(res.body).toEqual(
          expect.objectContaining({
            name: 'Meet Realtime Backend',
            status: 'ok',
            frontendUrl: 'https://github.com/sumit-s-nair/meet-electron-client',
            liveDemoUrl: 'https://meet-lite.vercel.app/',
            health: { service: 'up' },
            endpoints: expect.arrayContaining([
              expect.objectContaining({ method: 'GET', path: '/' }),
              expect.objectContaining({ method: 'POST', path: '/users/guest' }),
              expect.objectContaining({ method: 'POST', path: '/meetings' }),
            ]),
          }),
        );
      });
  });
});
