import { Injectable } from '@nestjs/common';

type EndpointInfo = {
  method: 'GET' | 'POST';
  path: string;
  description: string;
};

export type RootApiInfo = {
  name: string;
  status: 'ok';
  frontendUrl: string;
  liveDemoUrl: string;
  health: {
    service: 'up';
  };
  endpoints: EndpointInfo[];
};

@Injectable()
export class AppService {
  getApiInfo(): RootApiInfo {
    return {
      name: 'Meet Realtime Backend',
      status: 'ok',
      frontendUrl: 'https://github.com/sumit-s-nair/meet-electron-client',
      liveDemoUrl: 'https://meet-lite.vercel.app/',
      health: {
        service: 'up',
      },
      endpoints: [
        {
          method: 'GET',
          path: '/',
          description: 'API information and health status',
        },
        {
          method: 'POST',
          path: '/users/guest',
          description: 'Create a guest user',
        },
        {
          method: 'GET',
          path: '/users/:id',
          description: 'Get user details by user ID',
        },
        {
          method: 'POST',
          path: '/meetings',
          description: 'Create a meeting',
        },
        {
          method: 'GET',
          path: '/meetings/:id',
          description: 'Get meeting details by meeting ID',
        },
        {
          method: 'GET',
          path: '/meetings/:id/token?userId=<userId>',
          description: 'Generate a LiveKit token for a user in a meeting',
        },
      ],
    };
  }
}
