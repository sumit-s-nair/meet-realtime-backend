import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('root', () => {
    it('should return api info with health and endpoints', () => {
      expect(appController.getApiInfo()).toEqual(
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
