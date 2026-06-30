import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import BlogImage from "@/components/BlogImage";
import dbConnect from "@/lib/db";
import { Blog } from "@/lib/models";
import { serializeBlog } from "@/lib/blogData";
import { getDevBlog } from "@/lib/devBlogStore";
import { SITE_NAME, SITE_URL } from "@/lib/constants";
import { BlogPost } from "@/types";

async function getBlog(slug: string): Promise<BlogPost | null> {
  try {
    await dbConnect();
    const doc = await Blog.findOne({ slug, published: true }).lean();
    return doc ? serializeBlog(doc) : null;
  } catch {
    // Fall back to dev blogs if MongoDB is not available or not configured
    const blog = getDevBlog(slug);
    return blog?.published ? blog : null;
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const blog = await getBlog(slug);
  if (!blog) return { title: `Article Not Found | ${SITE_NAME}` };

  return {
    title: blog.title,
    description: blog.seo.metaDescription || blog.excerpt,
    alternates: {
      canonical: `${SITE_URL}/blog/${blog.slug}`,
    },
    openGraph: {
      title: blog.title,
      description: blog.seo.metaDescription || blog.excerpt,
      url: `${SITE_URL}/blog/${blog.slug}`,
      siteName: SITE_NAME,
      type: "article",
      images: blog.seo.ogImage ? [{ url: blog.seo.ogImage }] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: blog.title,
      description: blog.seo.metaDescription || blog.excerpt,
      images: blog.seo.ogImage ? [blog.seo.ogImage] : undefined,
    },
  };
}

export default async function BlogDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const blog = await getBlog(slug);
  if (!blog) notFound();

  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-white pt-28">
        <article>
          <header className="bg-dark-950 px-4 py-16 text-white">
            <div className="mx-auto max-w-4xl">
              <Link href="/blog" className="text-sm font-semibold text-gold-500">
                Back to insights
              </Link>
              <p className="mt-8 text-sm font-semibold uppercase tracking-[0.2em] text-gold-500">
                {blog.category}
              </p>
              <h1 className="mt-3 text-5xl">{blog.title}</h1>
              <p className="text-gray-300">{blog.excerpt}</p>
            </div>
          </header>

          {blog.featuredImage && (
            <div className="relative mx-auto mt-[-3rem] aspect-[16/8] max-w-5xl overflow-hidden rounded-lg bg-dark-200 shadow-luxury">
              <BlogImage
                src={blog.featuredImage}
                alt={blog.title}
                sizes="(min-width: 1024px) 960px, 100vw"
                priority
              />
            </div>
          )}

          <div className="mx-auto max-w-3xl px-4 py-12">
            <div className="mb-8 flex flex-wrap gap-2">
              {blog.tags.map((tag) => (
                <span key={tag} className="rounded-full bg-gold-50 px-3 py-1 text-sm text-gold-800">
                  {tag}
                </span>
              ))}
            </div>
            <div className="space-y-5 text-lg leading-8 text-dark-800">
              {blog.content.split(/\n\n+/).map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}
