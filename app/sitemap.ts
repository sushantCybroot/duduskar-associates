import type { MetadataRoute } from "next";
import dbConnect, { isMongoConfigured } from "@/lib/db";
import { Blog } from "@/lib/models";
import { sampleBlogs } from "@/lib/blogData";
import { SITE_URL } from "@/lib/constants";

type SitemapBlog = {
  slug: string;
  updatedAt?: Date;
};

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  let blogUrls = sampleBlogs.map((blog) => ({
    url: `${SITE_URL}/blog/${blog.slug}`,
    lastModified: blog.updatedAt,
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  try {
    await dbConnect();
    const blogs = (await Blog.find({ published: true })
      .select("slug updatedAt")
      .lean()) as SitemapBlog[];
    blogUrls = blogs.map((blog) => ({
      url: `${SITE_URL}/blog/${blog.slug}`,
      lastModified: blog.updatedAt || new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.7,
    }));
  } catch (error) {
    if (isMongoConfigured()) {
      console.error("Sitemap blog fetch failed:", error);
    }
  }

  return [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${SITE_URL}/blog`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    ...blogUrls,
  ];
}
