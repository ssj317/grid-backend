import Block from "../models/block.js";

export const initializeGrid = async (size) => {
  try {
    console.log(`🔍 Checking if grid is already initialized...`);
    const count = await Block.countDocuments();
    console.log(`📊 Current block count: ${count}`);

    if (count > 0) {
      console.log("✅ Grid already initialized");
      return;
    }

    console.log(`🏗️  Creating ${size}x${size} grid (${size * size} blocks)...`);
    const blocks = [];

    for (let x = 0; x < size; x++) {
      for (let y = 0; y < size; y++) {
        blocks.push({ x, y });
      }
    }

    await Block.insertMany(blocks);
    console.log(`✅ Grid initialized with ${size * size} blocks`);
  } catch (error) {
    console.error("❌ Error initializing grid:", error);
  }
};
