import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from "@nestjs/typeorm"
import { User } from "./users/user.entity"


import { MeetingModule } from './meeting/meeting.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [ConfigModule.forRoot({
    isGlobal: true,
    envFilePath: '.env',
  }),
  TypeOrmModule.forRoot({
    type: "postgres",
    url: process.env.DATABASE_URL,
    autoLoadEntities: true,
    synchronize: true
  }),
    MeetingModule, UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
