import mongoose, { Schema, model } from "mongoose";

const UserSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    passwordHash: {
      type: String,
      required: true,
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["admin"],
      default: "admin",
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    lastLogin: {
      type: Date,
      default: null,
    },
  },
  { timestamps: true }
);

const BlogSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    content: {
      type: String,
      required: true,
    },
    excerpt: {
      type: String,
      required: true,
      trim: true,
    },
    featuredImage: {
      type: String,
      default: "",
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
    category: {
      type: String,
      enum: [
        "Civil Litigation",
        "Property Law",
        "Motor Accident Claims",
        "Arbitration",
        "Legal Updates",
        "Case Studies",
      ],
      required: true,
    },
    tags: [
      {
        type: String,
        trim: true,
      },
    ],
    published: {
      type: Boolean,
      default: false,
    },
    viewCount: {
      type: Number,
      default: 0,
    },
    seo: {
      metaDescription: String,
      keywords: [String],
      ogImage: String,
    },
  },
  { timestamps: true }
);

const OtpTokenSchema = new Schema(
  {
    email: {
      type: String,
      lowercase: true,
      trim: true,
    },
    phone: {
      type: String,
      trim: true,
      index: true,
    },
    otp: {
      type: String,
      required: true,
    },
    expiresAt: {
      type: Date,
      required: true,
      index: { expires: 0 }, // Auto-delete after expiry
    },
    attempts: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

const ContactInquirySchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },
    phone: {
      type: String,
      required: true,
      trim: true,
    },
    subject: {
      type: String,
      required: true,
      trim: true,
    },
    message: {
      type: String,
      required: true,
      trim: true,
    },
    status: {
      type: String,
      enum: ["new", "read", "replied"],
      default: "new",
    },
  },
  { timestamps: true }
);

// Create indexes
BlogSchema.index({ published: 1 });
BlogSchema.index({ category: 1 });
BlogSchema.index({ createdAt: -1 });
BlogSchema.index({ title: "text", excerpt: "text", content: "text" });

export const User = mongoose.models.User || model("User", UserSchema);
export const Blog = mongoose.models.Blog || model("Blog", BlogSchema);
export const OtpToken =
  mongoose.models.OtpToken || model("OtpToken", OtpTokenSchema);
export const ContactInquiry =
  mongoose.models.ContactInquiry ||
  model("ContactInquiry", ContactInquirySchema);
