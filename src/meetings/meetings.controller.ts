import { Controller, Post, Body, Get, Param, Query } from "@nestjs/common";
import { MeetingsService } from "./meetings.service";

@Controller("meetings")
export class MeetingsController {

  constructor(private meetingsService: MeetingsService) {}

  @Post()
  async create(@Body("userId") userId: string) {
    return this.meetingsService.createMeeting(userId);
  }

  @Get(":id")
  async getMeeting(@Param("id") id: string) {
    return this.meetingsService.findById(id);
  }

  @Get(":id/token")
  async getToken(
    @Param("id") meetingId: string,
    @Query("userId") userId: string
  ) {
    return {
      token: await this.meetingsService.createToken(meetingId, userId),
    };
  }
}