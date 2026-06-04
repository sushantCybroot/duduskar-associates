import Link from "next/link";
import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth";
import { Blog } from "@/lib/models";
import dbConnect, { isProduction } from "@/lib/db";
import { serializeBlog } from "@/lib/blogData";
import { getDevBlogs } from "@/lib/devBlogStore";
import { BlogPost } from "@/types";
import AdminLogoutButton from "@/components/AdminLogoutButton";
import AdminBlogDeleteButton from "@/components/AdminBlogDeleteButton";

async function getBlogs(): Promise<{ blogs: BlogPost[]; fallback: boolean }> {
  try {
    await dbConnect();
    const docs = await Blog.find({}).sort({ createdAt: -1 }).lean();
    return { blogs: docs.map(serializeBlog), fallback: false };
  } catch {
    if (isProduction) {
      throw new Error("MongoDB is required for the production admin dashboard.");
    }

    return { blogs: getDevBlogs(), fallback: true };
  }
}

export const metadata = {
  title: "Admin Dashboard | Duduskar & Associates",
};

export default async function AdminDashboardPage() {
  const session = await getSession();
  if (!session) redirect("/admin/login");
  const sessionLabel = "phone" in session ? session.phone : "admin";

  const { blogs, fallback } = await getBlogs();

  return (
    <main className="min-h-screen bg-dark-50 px-4 py-10">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-center">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-gold-700">
              Duduskar Admin
            </p>
            <h1 className="text-4xl text-dark-950">Dashboard</h1>
            <p className="text-dark-600">Signed in as {sessionLabel}</p>
          </div>
          <div className="flex gap-3">
            <Link
              href="/admin/blogs/create"
              className="rounded-lg bg-gold-500 px-5 py-3 font-semibold text-dark-950"
            >
              New Article
            </Link>
            <AdminLogoutButton />
          </div>
        </div>

        {fallback && (
          <div className="mb-6 rounded-lg border border-gold-500/30 bg-gold-50 p-4 text-sm text-dark-800">
            MongoDB is not configured yet, so blog changes are saved in local development memory.
          </div>
        )}

        <section className="grid gap-4 md:grid-cols-3">
          <div className="rounded-lg bg-white p-5 shadow-luxury">
            <p className="text-sm text-dark-500">Total posts</p>
            <strong className="text-3xl">{blogs.length}</strong>
          </div>
          <div className="rounded-lg bg-white p-5 shadow-luxury">
            <p className="text-sm text-dark-500">Published</p>
            <strong className="text-3xl">{blogs.filter((blog) => blog.published).length}</strong>
          </div>
          <div className="rounded-lg bg-white p-5 shadow-luxury">
            <p className="text-sm text-dark-500">Drafts</p>
            <strong className="text-3xl">{blogs.filter((blog) => !blog.published).length}</strong>
          </div>
        </section>

        <section className="mt-8 overflow-hidden rounded-lg bg-white shadow-luxury">
          <div className="border-b border-dark-100 p-5">
            <h2 className="text-2xl">Blog Management</h2>
          </div>
          <div className="divide-y divide-dark-100">
            {blogs.map((blog) => (
              <div key={blog.id} className="grid gap-3 p-5 md:grid-cols-[1fr_auto] md:items-center">
                <div>
                  <h3 className="text-xl">{blog.title}</h3>
                  <p className="text-sm text-dark-500">
                    {blog.category} · {blog.published ? "Published" : "Draft"}
                  </p>
                </div>
                <div className="flex flex-wrap gap-3">
                  <Link href={`/blog/${blog.slug}`} className="rounded-lg border px-4 py-2 text-sm">
                    View
                  </Link>
                  <Link
                    href={`/admin/blogs/${blog.id}`}
                    className="rounded-lg bg-dark-950 px-4 py-2 text-sm text-white"
                  >
                    Edit
                  </Link>
                  <AdminBlogDeleteButton blogId={blog.id} title={blog.title} />
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
