import { BlogPost } from "@/types";
import { generateSlug } from "@/lib/validation";
import { sampleBlogs } from "@/lib/blogData";

type BlogInput = {
  title: string;
  excerpt: string;
  content: string;
  category: string;
  tags?: string[];
  featuredImage?: string;
  published?: boolean;
  metaDescription?: string;
};

type DevBlogGlobal = typeof globalThis & {
  __duduskarDevBlogs?: BlogPost[];
};

const getStore = () => {
  const store = globalThis as DevBlogGlobal;
  store.__duduskarDevBlogs ||= sampleBlogs.map((blog) => ({ ...blog }));
  return store.__duduskarDevBlogs;
};

const uniqueSlug = (title: string, currentId?: string) => {
  const blogs = getStore();
  const base = generateSlug(title);
  let slug = base;
  let suffix = 1;

  while (blogs.some((blog) => blog.slug === slug && blog.id !== currentId)) {
    suffix += 1;
    slug = `${base}-${suffix}`;
  }

  return slug;
};

export const getDevBlogs = () => getStore();

export const getDevBlog = (idOrSlug: string) =>
  getStore().find((blog) => blog.id === idOrSlug || blog.slug === idOrSlug) || null;

export const createDevBlog = (input: BlogInput) => {
  const now = new Date();
  const blog: BlogPost = {
    id: `dev-${Date.now()}`,
    title: input.title,
    slug: uniqueSlug(input.title),
    excerpt: input.excerpt,
    content: input.content,
    featuredImage: input.featuredImage || "",
    author: { id: "firm", name: "Duduskar & Associates" },
    category: input.category,
    tags: input.tags || [],
    published: Boolean(input.published),
    viewCount: 0,
    seo: {
      metaDescription: input.metaDescription || input.excerpt,
      keywords: input.tags || [],
      ogImage: input.featuredImage || "",
    },
    createdAt: now,
    updatedAt: now,
  };

  getStore().unshift(blog);
  return blog;
};

export const updateDevBlog = (id: string, input: BlogInput) => {
  const blogs = getStore();
  const index = blogs.findIndex((blog) => blog.id === id || blog.slug === id);
  if (index === -1) return null;

  const current = blogs[index];
  const updated: BlogPost = {
    ...current,
    title: input.title,
    slug: uniqueSlug(input.title, current.id),
    excerpt: input.excerpt,
    content: input.content,
    featuredImage: input.featuredImage || "",
    category: input.category,
    tags: input.tags || [],
    published: Boolean(input.published),
    seo: {
      metaDescription: input.metaDescription || input.excerpt,
      keywords: input.tags || [],
      ogImage: input.featuredImage || "",
    },
    updatedAt: new Date(),
  };

  blogs[index] = updated;
  return updated;
};

export const deleteDevBlog = (id: string) => {
  const blogs = getStore();
  const index = blogs.findIndex((blog) => blog.id === id || blog.slug === id);
  if (index === -1) return false;
  blogs.splice(index, 1);
  return true;
};
