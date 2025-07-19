import mongoose from "mongoose";

const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
  throw new Error("⚠️ MONGO_URI is not defined in environment variables");
}

const connectDB = async () => {
  try {
    if (mongoose.connections[0].readyState) {
      // Already connected
      console.log("✅ Already connected to MongoDB");
      return;
    }

    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("✅ Connected to MongoDB");
  } catch (error) {
    console.error("❌ MongoDB connection error:", error);
    process.exit(1); // Exit with failure
  }
};

export default connectDB;
