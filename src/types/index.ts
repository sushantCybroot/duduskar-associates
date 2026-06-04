// User types
export interface AdminUser {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: "admin";
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// Blog types
export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  featuredImage: string;
  author: {
    id: string;
    name: string;
  };
  category: string;
  tags: string[];
  published: boolean;
  viewCount: number;
  seo: {
    metaDescription: string;
    keywords: string[];
    ogImage: string;
  };
  createdAt: Date;
  updatedAt: Date;
}

// Contact types
export interface ContactInquiry {
  id: string;
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  status: "new" | "read" | "replied";
  createdAt: Date;
}

// OTP Token types
export interface OtpToken {
  id: string;
  email: string;
  otp: string;
  expiresAt: Date;
  attempts: number;
  createdAt: Date;
}

// API Response types
export interface ApiResponse<T = unknown> {
  success: boolean;
  message: string;
  data?: T;
  error?: string;
}

// Authentication types
export interface AuthSession {
  user: {
    id: string;
    email: string;
    name: string;
  };
  expires: string;
}

// Team member types
export interface TeamMember {
  id: string;
  name: string;
  title: string;
  designation: string;
  bio: string;
  image: string;
}

// Practice area types
export interface PracticeArea {
  id: string;
  title: string;
  description: string;
  fullDescription: string;
}

// Statistic types
export interface Statistic {
  number: string;
  label: string;
}
