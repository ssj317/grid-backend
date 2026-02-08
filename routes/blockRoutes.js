import express from "express";
import { getAllBlocks } from "../controllers/blockController.js";

const router = express.Router();

// GET /api/blocks
router.get("/", getAllBlocks);

export default router;
