import { NextRequest, NextResponse } from "next/server";
import dbConnect, { isProduction } from "@/lib/db";
import { ContactInquiry } from "@/lib/models";
import { validateContactForm, normalizeInput, sanitizeInput } from "@/lib/validation";
import { sendEmail, contactNotificationTemplate } from "@/lib/email";
import { FIRM } from "@/lib/constants";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate input
    const validationErrors = validateContactForm(body);
    if (Object.keys(validationErrors).length > 0) {
      return NextResponse.json(
        {
          success: false,
          message: "Validation failed",
          errors: validationErrors,
        },
        { status: 400 }
      );
    }

    // Normalize and sanitize input
    const sanitizedData = {
      name: sanitizeInput(normalizeInput(body.name)),
      email: sanitizeInput(normalizeInput(body.email)).toLowerCase(),
      phone: sanitizeInput(normalizeInput(body.phone)),
      subject: sanitizeInput(normalizeInput(body.subject)),
      message: sanitizeInput(normalizeInput(body.message)),
    };

    let inquiryId: string | undefined;
    let inquirySaved = false;

    try {
      await dbConnect();

      const inquiry = new ContactInquiry(sanitizedData);
      await inquiry.save();
      inquiryId = inquiry._id.toString();
      inquirySaved = true;
    } catch (error) {
      console.error("Contact inquiry database save failed:", error);
    }

    const emailTemplate = contactNotificationTemplate(
      sanitizedData.name,
      sanitizedData.email,
      sanitizedData.phone,
      sanitizedData.subject,
      sanitizedData.message
    );

    const emailSent = await sendEmail({
      to: FIRM.email,
      subject: `New Contact Inquiry: ${sanitizedData.subject}`,
      html: emailTemplate,
      replyTo: sanitizedData.email,
    });

    if (!emailSent && !inquirySaved) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Unable to submit your inquiry right now. Please call or email us directly.",
        },
        { status: 502 }
      );
    }

    if (inquirySaved && !emailSent) {
      return NextResponse.json(
        {
          success: true,
          message:
            "Your inquiry has been submitted successfully. Email notifications are temporarily unavailable, but we have received your message.",
          data: { id: inquiryId },
        },
        { status: 201 }
      );
    }

    if (!inquirySaved && emailSent) {
      const statusCode = isProduction ? 202 : 201;

      return NextResponse.json(
        {
          success: true,
          message:
            "Your inquiry email was sent successfully. We could not save it to the database, but our team has still been notified.",
          data: { id: inquiryId },
        },
        { status: statusCode }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "Your inquiry has been submitted successfully.",
        data: { id: inquiryId },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Failed to submit inquiry. Please try again.",
      },
      { status: 500 }
    );
  }
}

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    },
  });
}
