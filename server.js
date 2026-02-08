// import express from "express";
// import http from "http";
// import { Server } from "socket.io";
// import cors from "cors";
// import dotenv from "dotenv";

// import { connectDB } from "./config/db.js";
// import blockRoutes from "./routes/blockRoutes.js";
// import { setupSocket } from "./socket/socketHandler.js";
// import { initializeGrid } from "./utils/initGrid.js";

// dotenv.config();



// const app = express();
// const server = http.createServer(app);

// const io = new Server(server, {
//   cors: {
//     origin: "*",
//   },
// });

// console.log("Connecting to database...");
// connectDB();

// app.use(cors());
// app.use(express.json());

// // Request logging middleware
// app.use((req, res, next) => {
//   console.log(` ${req.method} ${req.url}`);
//   next();
// });

// app.use("/api/blocks", blockRoutes);

// console.log("🔌 Setting up Socket.IO...");
// setupSocket(io);

// // Initialize grid
// console.log(" Initializing grid...");
// initializeGrid(Number(process.env.GRID_SIZE || 40));

// const PORT = process.env.PORT || 5000;

// server.listen(PORT, () => {
 
//   console.log(` Server running on port ${PORT}`);

//   console.log(` Socket.IO ready`);
 
// });



import express from "express";
import http from "http";
import { Server } from "socket.io";
import cors from "cors";
import dotenv from "dotenv";

import { connectDB } from "./config/db.js";
import blockRoutes from "./routes/blockRoutes.js";
import { setupSocket } from "./socket/socketHandler.js";
import { initializeGrid } from "./utils/initGrid.js";

dotenv.config();

const app = express();
const server = http.createServer(app);



// Define allowed origins
const allowedOrigins = [
  "http://localhost:5173",  
  "http://localhost:3000",   
  process.env.FRONTEND_URL   
].filter(Boolean);

// Express CORS
app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("CORS not allowed"));
      }
    },
    credentials: true,
  })
);

app.use(express.json());

// Request logging
app.use((req, res, next) => {
  console.log(`📥 ${req.method} ${req.url}`);
  next();
});

// Routes
app.use("/api/blocks", blockRoutes);



const io = new Server(server, {
  cors: {
    origin: allowedOrigins,
    methods: ["GET", "POST"],
    credentials: true,
  },
});

console.log("🔌 Connecting to database...");
connectDB();

console.log("🔌 Setting up Socket.IO...");
setupSocket(io);

// Initialize grid
console.log(" Initializing grid...");
initializeGrid(Number(process.env.GRID_SIZE || 40));

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  
  console.log(` Server running on port ${PORT}`);
  console.log(` API available at http://localhost:${PORT}/api/blocks`);
  console.log(` Socket.IO ready`);

});
