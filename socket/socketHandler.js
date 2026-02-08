import Block from "../models/block.js";

export const setupSocket = (io) => {
  io.on("connection", (socket) => {
    console.log(" User connected:", socket.id);

    socket.on("capture_block", async ({ blockId, userId, color }) => {
      try {
        // Atomic update prevents race condition
        const updated = await Block.findOneAndUpdate(
          { _id: blockId, owner: null },
          {
            owner: userId,
            color,
            updatedAt: new Date(),
          },
          { new: true }
        );

        if (updated) {
          io.emit("block_updated", updated);
        } else {
          socket.emit("capture_failed", { blockId });
        }
      } catch (error) {
        console.error("❌ Capture error:", error.message);
      }
    });

    socket.on("disconnect", () => {
      console.log("🔴 User disconnected:", socket.id);
    });
  });
};
