# Real-Time Grid Capture Game – Backend

This is the backend server for a real-time multiplayer grid game. Users can capture tiles on a shared board, with all updates synchronized instantly across all connected clients using WebSockets.

## 🚀 Features
* **Real-Time Synchronization:** Powered by Socket.IO for instant updates.
* **Atomic Operations:** Prevents race conditions during tile capture using MongoDB's `findOneAndUpdate`.
* **Role-Based Access:** Dedicated routes for **Admin** (e.g., board reset) and **User** (e.g., tile capture).
* **Dynamic Grid:** Customizable grid size via environment variables.
* **Persistent Storage:** Grid state is preserved in MongoDB.

---

## 🛠 Tech Stack
* **Runtime:** Node.js
* **Framework:** Express
* **Database:** MongoDB (via Mongoose)
* **Real-Time:** Socket.IO
* **Security:** CORS & dotenv

---

## 📁 Project Structure
```text
backend/
│
├── config/
│   └── db.js              # MongoDB connection logic
├── models/
│   └── block.js           # Mongoose Schema for grid tiles
├── routes/
│   └── blockRoutes.js     # REST API endpoints (Admin/User restricted)
├── socket/
│   └── socketHandler.js   # Socket.IO event logic
├── utils/
│   └── initGrid.js        # Helper to seed the database grid
│
├── server.js              # Entry point
├── package.json
└── .env                   # Environment secrets
⚙️ Setup & Installation1. Environment VariablesCreate a .env file in the root directory:Code snippetPORT=5000
MONGO_URI=your_mongodb_connection_string
FRONTEND_URL=[https://your-frontend-url.com](https://your-frontend-url.com)
GRID_SIZE=40
2. Install DependenciesBashnpm install
3. Run the ServerBash# Development mode
npm run dev

# Production mode
npm start
The server will be available at http://localhost:5000.📡 API & Socket DocumentationREST APIEndpointMethodAccessDescription/api/blocksGETUser/AdminFetches the current state of the grid./api/admin/resetPOSTAdmin OnlyClears the board and resets all tiles.Socket.IO Events (Client → Server)capture_block: { blockId, userId, color } — Attempts to claim a specific tile.reset_board: Triggers a full board wipe (restricted to authorized sessions).Socket.IO Events (Server → Client)block_updated: Emitted when a tile is successfully captured.board_reset: Emitted when the grid is cleared by an admin.🧠 Concurrency & LogicTo prevent two users from claiming the same tile at the exact same millisecond, the server uses an atomic update:JavaScriptBlock.findOneAndUpdate(
  { _id: blockId, owner: null }, // Only update if currently unowned
  { owner: userId, color, updatedAt: new Date() },
  { new: true }
)
🌐 DeploymentThis backend is WebSocket-compatible. When deploying to platforms like Render, Railway, or Fly.io:Ensure WebSockets are enabled in your dashboard.Set FRONTEND_URL to allow CORS from your deployed frontend.Configure your MongoDB Atlas IP allowlist to accept connections from your hosting provider.
