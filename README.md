# Meet Realtime Backend

Backend API for guest users, meeting creation, and LiveKit access-token generation.

Built with NestJS, TypeORM, PostgreSQL, and LiveKit Server SDK.

## Frontend

- Frontend repository: https://github.com/sumit-s-nair/meet-electron-client
- Hosted live demo: https://meet-lite.vercel.app/

## Prerequisites

- Node.js 20+
- pnpm 9+
- PostgreSQL database (local or hosted)
- LiveKit project credentials

## Environment Variables

Create a `.env` file in the project root:

```env
DATABASE_URL=postgresql://username:password@host:5432/dbname
LIVEKIT_URL=wss://your-livekit-host
LIVEKIT_API_KEY=your_livekit_api_key
LIVEKIT_SECRET=your_livekit_api_secret
PORT=3000
```

Notes:
- The backend currently reads `LIVEKIT_SECRET` for token signing.
- `LIVEKIT_URL` is used by clients for connecting to LiveKit, not by token generation in this service.
- Database schema is auto-synced on startup (`synchronize: true`), which is convenient for development.

## Run LiveKit Locally (Docker)

You can run a local LiveKit server with:

```bash
docker run --rm -p 7880:7880 -p 7881:7881 -p 50000-50100:50000-50100/udp -e LIVEKIT_KEYS="devkey: secret" livekit/livekit-server --dev
```

Then update your `.env` values to match the key pair you set in `LIVEKIT_KEYS`:

```env
LIVEKIT_URL=ws://localhost:7880
LIVEKIT_API_KEY=devkey
LIVEKIT_SECRET=secret
```

If you change `devkey` or `secret`, make the same changes in your backend `.env` so token generation works.

## Install Dependencies

```bash
pnpm install
```

## Run the Application

```bash
# watch mode (recommended for development)
pnpm run start:dev

# single run
pnpm run start

# production build + run
pnpm run build
pnpm run start:prod
```

Server starts on `http://localhost:3000` by default.

## Test Commands

```bash
# unit tests
pnpm run test

# e2e tests
pnpm run test:e2e

# coverage
pnpm run test:cov
```

## API Overview

Base URL: `http://localhost:3000`

### 1 Health Check

```bash
curl http://localhost:3000
```

### 2 Create Guest User

```bash
curl -X POST http://localhost:3000/users/guest \
  -H "Content-Type: application/json" \
  -d '{"name":"Sumit"}'
```

Example response:

```json
{
  "id": "4f469a34-2ec6-4f57-a648-75f456ee9b11",
  "name": "Sumit",
  "createdAt": "2026-03-15T10:30:00.000Z"
}
```

### 3 Fetch User by ID

```bash
curl http://localhost:3000/users/<userId>
```

### 4 Create Meeting

```bash
curl -X POST http://localhost:3000/meetings \
  -H "Content-Type: application/json" \
  -d '{"userId":"<userId>"}'
```

Example response:

```json
{
  "id": "abc-def-ghi",
  "createdBy": "4f469a34-2ec6-4f57-a648-75f456ee9b11",
  "createdAt": "2026-03-15T10:31:00.000Z"
}
```

### 5 Fetch Meeting by ID

```bash
curl http://localhost:3000/meetings/<meetingId>
```

### 6 Generate LiveKit Token

```bash
curl "http://localhost:3000/meetings/<meetingId>/token?userId=<userId>"
```

Example response:

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI..."
}
```

Use this JWT on your frontend LiveKit client when joining the same room ID (`<meetingId>`).

## Typical Local Flow

1. Start backend with `pnpm run start:dev`.
2. Create a guest user and copy the returned `id`.
3. Create a meeting using that user ID.
4. Request a token for that meeting and user.
5. Join LiveKit room from your frontend with:
   - `url = LIVEKIT_URL`
   - `token = token` from `/meetings/:id/token`

## License

MIT
