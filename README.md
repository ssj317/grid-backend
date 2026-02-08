Real-Time Grid Capture Game – Backend

This is the backend server for a real-time multiplayer grid game where users can capture tiles on a shared board. All updates are synchronized instantly using WebSockets.

 Overview

The server:

Initializes a grid (default 40x40)

Stores tiles in MongoDB

Handles tile captures safely (race-condition free)

Syncs all updates in real-time using Socket.IO

Supports board reset

Handles multiple concurrent users

Tech Stack

Node.js

Express

MongoDB (Mongoose)

Socket.IO

CORS

dotenv

 Project Structure
backend/
│
├── config/
│   └── db.js
├── models/
│   └── block.js
├── routes/
│   └── blockRoutes.js
├── socket/
│   └── socketHandler.js
├── utils/
│   └── initGrid.js
│
├── server.js
├── package.json
└── .env

 Environment Variables

Create a .env file:

PORT=5000
MONGO_URI=your_mongodb_connection_string
FRONTEND_URL=https://your-frontend-url.com
GRID_SIZE=40

🗄 Database Schema

Each grid tile is stored as:

{
  x: Number,
  y: Number,
  owner: String | null,
  color: String | null,
  updatedAt: Date
}

 REST API
Get All Blocks
GET /api/blocks


Returns the full grid from the database.

 Socket.IO Events
Client → Server

capture_block

{
  blockId,
  userId,
  color
}


Attempts to claim a tile.

reset_board

Resets all tiles (used at end of round).

Server → Client

block_updated
Emitted when a tile is successfully captured.

board_reset
Emitted when the grid is cleared.

Concurrency Handling

Tile capture uses an atomic MongoDB operation:

Block.findOneAndUpdate(
  { _id: blockId, owner: null },
  { owner: userId, color },
  { new: true }
)


This guarantees:

No race conditions

No overwriting

Only one player can capture a tile

 Running Locally

Install dependencies:

npm install


Start server:

npm run dev


Server will run at:

http://localhost:5000

 Deployment

Backend is WebSocket-compatible and can be deployed on:

Render

Railway

Fly.io

DigitalOcean

Important:

Enable WebSockets

Configure CORS correctly

Set FRONTEND_URL in environment variables

 Real-Time Flow

User clicks a tile

Frontend emits capture_block

Server updates DB atomically

Server broadcasts block_updated

All clients update instantly
