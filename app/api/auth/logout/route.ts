import { NextResponse } from "next/server";
import { clearSessionCookieOptions } from "@/lib/auth";

export async function POST() {
  const response = NextResponse.json({ success: true, message: "Logged out." });
  response.cookies.set({ ...clearSessionCookieOptions, value: "" });
  return response;
}
