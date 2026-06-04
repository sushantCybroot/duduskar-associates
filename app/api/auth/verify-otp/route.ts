import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import { OtpToken } from "@/lib/models";
import { createSessionToken, isAdminPhone, normalizePhone, sessionCookieOptions } from "@/lib/auth";

type DevOtpStore = Record<
  string,
  { otpHash: string; expiresAt: Date; attempts: number; otp: string }
>;

type StoredOtp = {
  otp: string;
  expiresAt: Date;
  attempts: number;
  save?: () => Promise<void>;
};

const getDevOtpStore = () => {
  const globalStore = globalThis as typeof globalThis & {
    __duduskarDevOtps?: DevOtpStore;
  };
  globalStore.__duduskarDevOtps ||= {};
  return globalStore.__duduskarDevOtps;
};

export async function POST(request: NextRequest) {
  try {
    const { phone, otp } = await request.json();
    const normalizedPhone = normalizePhone(String(phone || ""));
    const rawOtp = String(otp || "").trim();

    if (!isAdminPhone(normalizedPhone) || !/^\d{6}$/.test(rawOtp)) {
      return NextResponse.json(
        { success: false, message: "Invalid verification request." },
        { status: 400 }
      );
    }

    let token: StoredOtp | null = null;
    let usingDevStore = false;

    try {
      await dbConnect();
      token = await OtpToken.findOne({ phone: normalizedPhone }).sort({ createdAt: -1 });
    } catch (error) {
      if (process.env.NODE_ENV === "production") {
        throw error;
      }

      const devToken = getDevOtpStore()[normalizedPhone];
      token = devToken
        ? {
            otp: devToken.otpHash,
            expiresAt: devToken.expiresAt,
            attempts: devToken.attempts,
          }
        : null;
      usingDevStore = true;
    }

    if (!token || token.expiresAt < new Date() || token.attempts >= 3) {
      return NextResponse.json(
        { success: false, message: "OTP expired or too many attempts." },
        { status: 401 }
      );
    }

    const isMatch = await bcrypt.compare(rawOtp, token.otp);
    if (!isMatch) {
      token.attempts += 1;
      if (usingDevStore) {
        getDevOtpStore()[normalizedPhone].attempts = token.attempts;
      } else if (token.save) {
        await token.save();
      }
      return NextResponse.json(
        { success: false, message: "Incorrect OTP." },
        { status: 401 }
      );
    }

    if (usingDevStore) {
      delete getDevOtpStore()[normalizedPhone];
    } else {
      await OtpToken.deleteMany({ phone: normalizedPhone });
    }

    const response = NextResponse.json({
      success: true,
      message: "Admin session created.",
    });
    response.cookies.set({
      ...sessionCookieOptions,
      value: createSessionToken(normalizedPhone),
    });
    return response;
  } catch (error) {
    console.error("Verify OTP error:", error);
    return NextResponse.json(
      { success: false, message: "Unable to verify OTP." },
      { status: 500 }
    );
  }
}
