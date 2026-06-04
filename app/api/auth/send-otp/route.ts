import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import { OtpToken } from "@/lib/models";
import { isAdminPhone, normalizePhone } from "@/lib/auth";

type DevOtpStore = Record<
  string,
  { otpHash: string; expiresAt: Date; attempts: number; otp: string }
>;

const getDevOtpStore = () => {
  const globalStore = globalThis as typeof globalThis & {
    __duduskarDevOtps?: DevOtpStore;
  };
  globalStore.__duduskarDevOtps ||= {};
  return globalStore.__duduskarDevOtps;
};

export async function POST(request: NextRequest) {
  try {
    const { phone } = await request.json();
    const normalizedPhone = normalizePhone(String(phone || ""));

    if (!isAdminPhone(normalizedPhone)) {
      return NextResponse.json(
        { success: false, message: "This phone number is not authorized for admin access." },
        { status: 403 }
      );
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const otpHash = await bcrypt.hash(otp, 10);
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000);

    try {
      await dbConnect();
      await OtpToken.deleteMany({ phone: normalizedPhone });
      await OtpToken.create({ phone: normalizedPhone, otp: otpHash, expiresAt });
    } catch (error) {
      if (process.env.NODE_ENV === "production") {
        throw error;
      }

      getDevOtpStore()[normalizedPhone] = {
        otpHash,
        expiresAt,
        attempts: 0,
        otp,
      };
    }

    return NextResponse.json({
      success: true,
      message:
        process.env.NODE_ENV === "production"
          ? "OTP sent successfully."
          : `Development OTP: ${otp}`,
      devOtp: process.env.NODE_ENV === "production" ? undefined : otp,
    });
  } catch (error) {
    console.error("Send OTP error:", error);
    return NextResponse.json(
      { success: false, message: "Unable to send OTP. Check MongoDB or SMS provider settings." },
      { status: 500 }
    );
  }
}
