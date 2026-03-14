import { Controller, Get, Query } from '@nestjs/common';
import { MeetingService } from './meeting.service';

@Controller('meeting')
export class MeetingController {

    constructor(private meetingService: MeetingService) { }

    @Get('token')
    async getToken(
        @Query('room') room: string,
        @Query('user') user: string,
    ) {
        return {
            token: await this.meetingService.createToken(room, user),
        }
    }
}
