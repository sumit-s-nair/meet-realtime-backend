import { Module } from '@nestjs/common';
import { MeetingsService } from './meetings.service';
import { MeetingsController } from './meetings.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Meeting } from './meeting.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Meeting])],
  providers: [MeetingsService],
  controllers: [MeetingsController]
})
export class MeetingsModule {}
