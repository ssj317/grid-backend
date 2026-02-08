import Block from "../models/block.js";

export const getAllBlocks = async (req, res) => {
  try {
    console.log("📦 Fetching all blocks from database...");
    const blocks = await Block.find();
    console.log(`✅ Found ${blocks.length} blocks`);
    res.status(200).json(blocks);
  } catch (error) {
    console.error("❌ Error fetching blocks:", error);
    res.status(500).json({ message: "Failed to fetch blocks" });
  }
};
