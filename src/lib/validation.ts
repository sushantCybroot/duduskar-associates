// Email validation
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Phone validation (Indian format)
export const isValidPhone = (phone: string): boolean => {
  const phoneRegex = /^(\+91|0)?[6-9]\d{9}$/;
  return phoneRegex.test(phone.replace(/[^\d+]/g, ""));
};

// Name validation
export const isValidName = (name: string): boolean => {
  return name.trim().length >= 2 && name.trim().length <= 100;
};

// Message validation
export const isValidMessage = (message: string): boolean => {
  const trimmed = message.trim();
  return trimmed.length >= 10 && trimmed.length <= 5000;
};

// Blog title validation
export const isValidBlogTitle = (title: string): boolean => {
  return title.trim().length >= 5 && title.trim().length <= 200;
};

// Blog excerpt validation
export const isValidExcerpt = (excerpt: string): boolean => {
  return excerpt.trim().length >= 10 && excerpt.trim().length <= 300;
};

// Blog content validation
export const isValidBlogContent = (content: string): boolean => {
  return content.trim().length >= 50;
};

// Slug generation and validation
export const generateSlug = (title: string): string => {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
};

// Contact form validation
export interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

export interface ValidationErrors {
  [key: string]: string;
}

export const validateContactForm = (
  data: ContactFormData
): ValidationErrors => {
  const errors: ValidationErrors = {};

  if (!isValidName(data.name)) {
    errors.name = "Please enter a valid name (2-100 characters)";
  }

  if (!isValidEmail(data.email)) {
    errors.email = "Please enter a valid email address";
  }

  if (!isValidPhone(data.phone)) {
    errors.phone = "Please enter a valid phone number";
  }

  if (!data.subject || data.subject.trim().length === 0) {
    errors.subject = "Please select a subject";
  }

  if (!isValidMessage(data.message)) {
    errors.message = "Message must be between 10 and 5000 characters";
  }

  return errors;
};

// Blog form validation
export interface BlogFormData {
  title: string;
  excerpt: string;
  content: string;
  category: string;
  tags?: string[];
  featuredImage?: string;
}

export const validateBlogForm = (
  data: BlogFormData
): ValidationErrors => {
  const errors: ValidationErrors = {};

  if (!isValidBlogTitle(data.title)) {
    errors.title = "Title must be between 5 and 200 characters";
  }

  if (!isValidExcerpt(data.excerpt)) {
    errors.excerpt = "Excerpt must be between 10 and 300 characters";
  }

  if (!isValidBlogContent(data.content)) {
    errors.content = "Content must be at least 50 characters";
  }

  if (!data.category || data.category.trim().length === 0) {
    errors.category = "Please select a category";
  }

  return errors;
};

// Sanitize input to prevent XSS
export const sanitizeInput = (input: string): string => {
  return input
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#x27;")
    .replace(/\//g, "&#x2F;");
};

// Trim and normalize whitespace
export const normalizeInput = (input: string): string => {
  return input.trim().replace(/\s+/g, " ");
};
