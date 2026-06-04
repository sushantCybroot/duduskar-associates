import type { MetadataRoute } from "next";
import dbConnect, { isMongoConfigured, isProduction } from "@/lib/db";
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
  }));

  try {
    await dbConnect();
    const blogs = (await Blog.find({ published: true })
      .select("slug updatedAt")
      .lean()) as SitemapBlog[];
    blogUrls = blogs.map((blog) => ({
      url: `${SITE_URL}/blog/${blog.slug}`,
      lastModified: blog.updatedAt || new Date(),
    }));
  } catch (error) {
    if (isProduction) {
      if (isMongoConfigured()) {
        console.error("Sitemap blog fetch failed:", error);
      }
      blogUrls = [];
    }
  }

  return [
    {
      url: SITE_URL,
      lastModified: new Date(),
    },
    {
      url: `${SITE_URL}/blog`,
      lastModified: new Date(),
    },
    ...blogUrls,
  ];
}
