import { Injectable } from '@nestjs/common';
import { AccessToken } from 'livekit-server-sdk';

@Injectable()
export class MeetingService {

    async createToken(room: string, identity: string) {

        const apiKey = process.env.LIVEKIT_API_KEY!
        const apiSecret = process.env.LIVEKIT_SECRET!

        const at = new AccessToken(apiKey, apiSecret, {
            identity,
        })

        at.addGrant({
            roomJoin: true,
            room,
        })

        return await at.toJwt()
    }
}