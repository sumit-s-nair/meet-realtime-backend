import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Meeting } from "./meeting.entity";
import { AccessToken } from "livekit-server-sdk";

@Injectable()
export class MeetingsService {

  constructor(
    @InjectRepository(Meeting)
    private meetingsRepo: Repository<Meeting>,
  ) {}

  generateMeetingCode(): string {
    const chars = "abcdefghijklmnopqrstuvwxyz";

    const part = () =>
      Array.from({ length: 3 }, () =>
        chars[Math.floor(Math.random() * chars.length)]
      ).join("");

    return `${part()}-${part()}-${part()}`;
  }

  async createMeeting(userId: string) {
    const meeting = this.meetingsRepo.create({
      id: this.generateMeetingCode(),
      createdBy: userId,
    });

    return this.meetingsRepo.save(meeting);
  }

  async findById(id: string) {
    return this.meetingsRepo.findOne({ where: { id } });
  }

  async createToken(room: string, identity: string) {

    const apiKey = process.env.LIVEKIT_API_KEY!;
    const apiSecret = process.env.LIVEKIT_SECRET!;

    const at = new AccessToken(apiKey, apiSecret, {
      identity,
    });

    at.addGrant({
      roomJoin: true,
      room,
    });

    return await at.toJwt();
  }
}