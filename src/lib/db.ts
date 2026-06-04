import mongoose, { Connection } from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;
const MONGODB_PLACEHOLDER_PATTERN =
  /username:password|cluster\.mongodb\.net\/dbname/i;

/**
 * Global is used here to maintain a cached connection across hot reloads
 * in development. This prevents connections growing exponentially
 * during API Route usage.
 */
const cached: { conn: Connection | null; promise: Promise<Connection> | null } = {
  conn: null,
  promise: null,
};

export const isMongoConfigured = () =>
  Boolean(MONGODB_URI && !MONGODB_PLACEHOLDER_PATTERN.test(MONGODB_URI));

export const isProduction = process.env.NODE_ENV === "production";

async function dbConnect(): Promise<Connection> {
  if (!isMongoConfigured()) {
    throw new Error(
      "Please define a production MongoDB connection string in MONGODB_URI"
    );
  }

  if (cached.conn) {
    console.log("Using cached MongoDB connection");
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
      connectTimeoutMS: 10000,
      serverSelectionTimeoutMS: 10000,
      retryWrites: true,
    };

    cached.promise = mongoose
      .connect(MONGODB_URI!, opts)
      .then((mongoose) => {
        console.log("Connected to MongoDB");
        return mongoose.connection;
      })
      .catch((error) => {
        console.error("MongoDB connection error:", error);
        throw error;
      });
  }

  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    throw e;
  }

  return cached.conn;
}

export default dbConnect;
