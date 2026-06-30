import type { Metadata } from "next";
import Link from "next/link";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import BlogImage from "@/components/BlogImage";
import dbConnect from "@/lib/db";
import { Blog } from "@/lib/models";
import { serializeBlog } from "@/lib/blogData";
import { getDevBlogs } from "@/lib/devBlogStore";
import { BLOG_CATEGORIES, SITE_NAME, SITE_URL } from "@/lib/constants";
import { BlogPost } from "@/types";

export const metadata: Metadata = {
  title: "Legal Insights",
  description:
    "Articles and updates from Duduskar & Associates on litigation, property law, arbitration, and legal strategy.",
  alternates: {
    canonical: `${SITE_URL}/blog`,
  },
  openGraph: {
    title: `Legal Insights | ${SITE_NAME}`,
    description:
      "Articles and updates from Duduskar & Associates on litigation, property law, arbitration, and legal strategy.",
    url: `${SITE_URL}/blog`,
    type: "website",
  },
};

async function getBlogs(): Promise<BlogPost[]> {
  try {
    await dbConnect();
    const docs = await Blog.find({ published: true }).sort({ createdAt: -1 }).lean();
    return docs.map(serializeBlog);
  } catch {
    // Fall back to dev blogs if MongoDB is not available or not configured
    return getDevBlogs().filter((blog) => blog.published);
  }
}

export default async function BlogPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string; q?: string }>;
}) {
  const params = await searchParams;
  const blogs = await getBlogs();
  const filteredBlogs = blogs.filter((blog) => {
    const matchesCategory = !params.category || blog.category === params.category;
    const matchesQuery =
      !params.q ||
      `${blog.title} ${blog.excerpt} ${blog.content}`.toLowerCase().includes(params.q.toLowerCase());
    return matchesCategory && matchesQuery;
  });

  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-dark-50 pt-28">
        <section className="bg-dark-950 px-4 py-20 text-white">
          <div className="mx-auto max-w-6xl">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-gold-500">
              Legal Insights
            </p>
            <h1 className="mt-4 max-w-3xl text-5xl">Practical updates for informed legal decisions</h1>
            <p className="max-w-2xl text-gray-300">
              Notes from our practice across civil litigation, property disputes, MACT claims,
              arbitration, and advisory work.
            </p>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-4 py-10">
          <form className="mb-8 grid gap-3 md:grid-cols-[1fr_auto]">
            <input
              name="q"
              defaultValue={params.q || ""}
              placeholder="Search articles"
              className="rounded-lg border border-dark-200 px-4 py-3"
            />
            <button className="rounded-lg bg-dark-950 px-6 py-3 font-semibold text-white">
              Search
            </button>
          </form>

          <div className="mb-8 flex flex-wrap gap-2">
            <Link
              href="/blog"
              className={`rounded-full border px-4 py-2 text-sm ${
                !params.category ? "bg-dark-950 text-white" : "bg-white text-dark-700"
              }`}
            >
              All
            </Link>
            {BLOG_CATEGORIES.map((category) => (
              <Link
                key={category}
                href={`/blog?category=${encodeURIComponent(category)}`}
                className={`rounded-full border px-4 py-2 text-sm ${
                  params.category === category ? "bg-dark-950 text-white" : "bg-white text-dark-700"
                }`}
              >
                {category}
              </Link>
            ))}
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {filteredBlogs.map((blog) => (
              <article key={blog.id} className="overflow-hidden rounded-lg bg-white shadow-luxury">
                <div className="relative aspect-[16/9] bg-dark-200">
                  {blog.featuredImage && (
                    <BlogImage
                      src={blog.featuredImage}
                      alt={blog.title}
                      sizes="(min-width: 768px) 50vw, 100vw"
                    />
                  )}
                </div>
                <div className="p-6">
                  <p className="text-sm font-semibold text-gold-700">{blog.category}</p>
                  <h2 className="mt-2 text-3xl text-dark-950">{blog.title}</h2>
                  <p className="text-dark-600">{blog.excerpt}</p>
                  <Link href={`/blog/${blog.slug}`} className="font-semibold text-navy-800">
                    Read article
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
