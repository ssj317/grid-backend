import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    console.log("🔄 Attempting to connect to MongoDB...");
    console.log("🔗 URI:", process.env.MONGO_URI);
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ MongoDB Connected successfully");
  } catch (error) {
    console.error("❌ DB Connection Failed:", error.message);
    console.error("💡 Make sure MongoDB is running locally");
    console.error("💡 Try: mongod --dbpath <your-db-path>");
    process.exit(1);
  }
};
