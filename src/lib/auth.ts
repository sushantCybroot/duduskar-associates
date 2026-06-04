import { cookies } from "next/headers";
import { createHmac, randomBytes, timingSafeEqual } from "crypto";

const SESSION_COOKIE = "duduskar_admin_session";
const SESSION_AGE_SECONDS = 60 * 60 * 8;
const DEFAULT_ADMIN_USERNAME = "gyduduskar";
const DEFAULT_ADMIN_PASSWORD = "gauravduduskar@18";
const DEFAULT_ADMIN_PHONE = "+919167570444";

const getSecret = () =>
  process.env.NEXTAUTH_SECRET || process.env.AUTH_SECRET || "development-only-secret";

const sign = (value: string) =>
  createHmac("sha256", getSecret()).update(value).digest("hex");

export const normalizePhone = (phone: string) => {
  const digits = phone.replace(/\D/g, "");

  if (digits.length === 10) {
    return `+91${digits}`;
  }

  if (digits.length === 12 && digits.startsWith("91")) {
    return `+${digits}`;
  }

  return phone.trim().replace(/\s+/g, "");
};

export const getAdminPhone = () =>
  normalizePhone(process.env.ADMIN_PHONE || DEFAULT_ADMIN_PHONE);

export const isAdminPhone = (phone: string) =>
  normalizePhone(phone) === getAdminPhone();

export const createSessionToken = (phone: string) => {
  const payload = JSON.stringify({
    phone: normalizePhone(phone),
    exp: Date.now() + SESSION_AGE_SECONDS * 1000,
    nonce: randomBytes(12).toString("hex"),
  });
  const body = Buffer.from(payload).toString("base64url");
  return `${body}.${sign(body)}`;
};

export const verifySessionToken = (token?: string) => {
  if (!token) return null;

  const [body, signature] = token.split(".");
  if (!body || !signature) return null;

  const expected = sign(body);
  const actualBuffer = Buffer.from(signature);
  const expectedBuffer = Buffer.from(expected);

  if (
    actualBuffer.length !== expectedBuffer.length ||
    !timingSafeEqual(actualBuffer, expectedBuffer)
  ) {
    return null;
  }

  try {
    const payload = JSON.parse(Buffer.from(body, "base64url").toString("utf8"));
    if (!payload.phone || payload.exp < Date.now() || !isAdminPhone(payload.phone)) {
      return null;
    }
    return { phone: payload.phone as string };
  } catch {
    return null;
  }
};

export const getSession = async () => {
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE)?.value;
  // Try OTP-based session first (for backward compatibility)
  const otpSession = verifySessionToken(token);
  if (otpSession) return otpSession;
  // Try credential-based session
  return verifyAdminSessionToken(token);
};

export const sessionCookieOptions = {
  name: SESSION_COOKIE,
  maxAge: SESSION_AGE_SECONDS,
  httpOnly: true,
  sameSite: "lax" as const,
  secure: process.env.NODE_ENV === "production",
  path: "/",
};

export const clearSessionCookieOptions = {
  ...sessionCookieOptions,
  maxAge: 0,
};

// Username/Password Authentication Functions
export const getAdminUsername = () =>
  process.env.ADMIN_USERNAME || DEFAULT_ADMIN_USERNAME;

export const getAdminPassword = () =>
  process.env.ADMIN_PASSWORD || DEFAULT_ADMIN_PASSWORD;

export const validateCredentials = (username: string, password: string) => {
  return username === getAdminUsername() && password === getAdminPassword();
};

export const createSessionTokenFromCredentials = () => {
  const payload = JSON.stringify({
    type: "admin",
    exp: Date.now() + SESSION_AGE_SECONDS * 1000,
    nonce: randomBytes(12).toString("hex"),
  });
  const body = Buffer.from(payload).toString("base64url");
  return `${body}.${sign(body)}`;
};

export const verifyAdminSessionToken = (token?: string) => {
  if (!token) return null;

  const [body, signature] = token.split(".");
  if (!body || !signature) return null;

  const expected = sign(body);
  const actualBuffer = Buffer.from(signature);
  const expectedBuffer = Buffer.from(expected);

  if (
    actualBuffer.length !== expectedBuffer.length ||
    !timingSafeEqual(actualBuffer, expectedBuffer)
  ) {
    return null;
  }

  try {
    const payload = JSON.parse(Buffer.from(body, "base64url").toString("utf8"));
    if (!payload.type || payload.type !== "admin" || payload.exp < Date.now()) {
      return null;
    }
    return { type: "admin" };
  } catch {
    return null;
  }
};
