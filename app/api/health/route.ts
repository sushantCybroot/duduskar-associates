import { NextResponse } from "next/server";
import dbConnect, { isMongoConfigured } from "@/lib/db";

export async function GET() {
  let database = "not_configured";

  if (isMongoConfigured()) {
    try {
      const connection = await dbConnect();
      database = connection.readyState === 1 ? "connected" : "disconnected";
    } catch {
      database = "error";
    }
  }

  return NextResponse.json({
    status: "ok",
    service: "Duduskar & Associates website",
    database,
    timestamp: new Date().toISOString(),
  });
}
