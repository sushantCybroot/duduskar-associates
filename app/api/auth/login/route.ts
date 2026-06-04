import { NextRequest, NextResponse } from "next/server";
import {
  validateCredentials,
  createSessionTokenFromCredentials,
  sessionCookieOptions,
} from "@/lib/auth";

export async function POST(request: NextRequest) {
  try {
    const { username, password } = await request.json();

    if (!username || !password) {
      return NextResponse.json(
        { success: false, message: "Username and password are required." },
        { status: 400 }
      );
    }

    if (!validateCredentials(username, password)) {
      return NextResponse.json(
        { success: false, message: "Invalid username or password." },
        { status: 401 }
      );
    }

    const sessionToken = createSessionTokenFromCredentials();

    const response = NextResponse.json(
      { success: true, message: "Login successful." },
      { status: 200 }
    );

    response.cookies.set(sessionCookieOptions.name, sessionToken, sessionCookieOptions);

    return response;
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json(
      { success: false, message: "An error occurred during login." },
      { status: 500 }
    );
  }
}
