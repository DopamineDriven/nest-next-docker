import { Injectable, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import createServer from 'next';
import { NextServer } from 'next/dist/server/next';

@Injectable()
export class ViewService implements OnModuleInit {
  private server: NextServer;

  constructor(private configService: ConfigService) {}

  async onModuleInit(): Promise<void> {
    try {
      this.server = createServer({
        dev: this.configService.get<string>('NODE_ENV') !== 'production',
        dir: './src/next',
      });
      await this.server.prepare();
    } catch (error) {
      const formattedError = JSON.stringify(error, null, 2)
      console.error("[view.service error]: \n" +formattedError);
    }
  }

  getNextServer(): NextServer {
    return this.server;
  }
}
