import nodemailer, { type Transporter } from "nodemailer";

const SMTP_HOST = process.env.SMTP_HOST || "smtp.gmail.com";
const SMTP_PORT = Number(process.env.SMTP_PORT || 587);
const SMTP_SECURE = process.env.SMTP_SECURE === "true";
const SMTP_USER = process.env.SMTP_USER || process.env.GMAIL_EMAIL;
const SMTP_PASS = process.env.SMTP_PASS || process.env.GMAIL_PASSWORD;

const PLACEHOLDER_VALUES = new Set([
  "your-email@gmail.com",
  "your-app-specific-password",
  "your-smtp-username",
  "your-smtp-password",
]);

const SMTP_CONFIG = {
  host: SMTP_HOST,
  port: SMTP_PORT,
  secure: SMTP_SECURE,
  auth: {
    user: SMTP_USER,
    pass: SMTP_PASS,
  },
};

let transporter: Transporter | null = null;

export const isEmailConfigured = () =>
  Boolean(
    SMTP_USER &&
      SMTP_PASS &&
      !PLACEHOLDER_VALUES.has(SMTP_USER) &&
      !PLACEHOLDER_VALUES.has(SMTP_PASS)
  );

export const getTransporter = async () => {
  if (!isEmailConfigured()) {
    console.warn("Email service is not configured");
    return null;
  }

  if (transporter) {
    return transporter;
  }

  transporter = nodemailer.createTransport(SMTP_CONFIG);

  // Verify connection
  try {
    await transporter.verify();
    console.log("Email service connected successfully");
  } catch (error) {
    console.error("Email service connection error:", error);
    transporter = null;
  }

  return transporter;
};

interface EmailOptions {
  to: string;
  subject: string;
  html: string;
  replyTo?: string;
}

export const sendEmail = async (options: EmailOptions): Promise<boolean> => {
  try {
    const transporter = await getTransporter();

    if (!transporter) {
      console.error("Email transporter not initialized");
      return false;
    }

    await transporter.sendMail({
      from: `"Duduskar & Associates" <${SMTP_USER}>`,
      ...options,
    });

    console.log(`Email sent successfully to ${options.to}`);
    return true;
  } catch (error) {
    console.error("Error sending email:", error);
    return false;
  }
};

// OTP Email Template
export const otpEmailTemplate = (otp: string): string => {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>
          body { font-family: 'Poppins', Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #f9a83a 0%, #1e3cb5 100%); color: white; padding: 30px; text-align: center; border-radius: 8px 8px 0 0; }
          .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 8px 8px; }
          .otp-box { background: white; border: 2px solid #f9a83a; padding: 20px; border-radius: 8px; text-align: center; margin: 20px 0; }
          .otp-code { font-size: 32px; font-weight: bold; color: #1e3cb5; letter-spacing: 5px; margin: 15px 0; }
          .footer { color: #666; font-size: 12px; margin-top: 20px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Duduskar & Associates</h1>
            <p>Premium Legal Services</p>
          </div>
          <div class="content">
            <h2>Admin Access Verification</h2>
            <p>You have requested to access the admin panel. Please use the following OTP to verify your identity:</p>

            <div class="otp-box">
              <p style="margin: 0; color: #666; font-size: 14px;">Your One-Time Password (OTP):</p>
              <div class="otp-code">${otp}</div>
              <p style="margin: 10px 0 0 0; color: #999; font-size: 12px;">Valid for 10 minutes</p>
            </div>

            <p><strong>Security Notice:</strong></p>
            <ul>
              <li>Never share this OTP with anyone</li>
              <li>Duduskar & Associates will never ask for your OTP via email or phone</li>
              <li>If you didn't request this, please ignore this email</li>
            </ul>

            <div class="footer">
              <p>© 2024 Duduskar & Associates. All rights reserved.</p>
              <p>This is an automated message. Please do not reply to this email.</p>
            </div>
          </div>
        </div>
      </body>
    </html>
  `;
};

// Contact Form Notification Template for Admin
export const contactNotificationTemplate = (
  name: string,
  email: string,
  phone: string,
  subject: string,
  message: string
): string => {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: 'Poppins', Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #f9a83a 0%, #1e3cb5 100%); color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0; }
          .content { background: #f9f9f9; padding: 20px; border-radius: 0 0 8px 8px; }
          .field { margin: 15px 0; padding: 10px; background: white; border-left: 4px solid #f9a83a; }
          .label { font-weight: bold; color: #1e3cb5; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h2>New Contact Inquiry</h2>
          </div>
          <div class="content">
            <div class="field">
              <div class="label">Name:</div>
              <p>${name}</p>
            </div>
            <div class="field">
              <div class="label">Email:</div>
              <p><a href="mailto:${email}">${email}</a></p>
            </div>
            <div class="field">
              <div class="label">Phone:</div>
              <p><a href="tel:${phone}">${phone}</a></p>
            </div>
            <div class="field">
              <div class="label">Subject:</div>
              <p>${subject}</p>
            </div>
            <div class="field">
              <div class="label">Message:</div>
              <p>${message.replace(/\n/g, "<br>")}</p>
            </div>
            <p style="margin-top: 20px; color: #666; font-size: 12px;">This is an automated notification. Please respond directly to the inquiry.</p>
          </div>
        </div>
      </body>
    </html>
  `;
};
