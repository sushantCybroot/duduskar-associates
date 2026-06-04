import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import AdminBlogEditor from "@/components/AdminBlogEditor";
import { getSession } from "@/lib/auth";
import dbConnect, { isProduction } from "@/lib/db";
import { Blog } from "@/lib/models";
import { serializeBlog } from "@/lib/blogData";
import { getDevBlog } from "@/lib/devBlogStore";
import { BlogPost } from "@/types";

export const metadata = {
  title: "Edit Blog | Duduskar & Associates",
};

export default async function EditBlogPage({ params }: { params: Promise<{ id: string }> }) {
  const session = await getSession();
  if (!session) redirect("/admin/login");

  const { id } = await params;
  let blog: BlogPost | null = null;
  try {
    await dbConnect();
    const doc = await Blog.findById(id).lean();
    blog = doc ? serializeBlog(doc) : null;
  } catch {
    if (isProduction) {
      throw new Error("MongoDB is required for production blog editing.");
    }

    blog = getDevBlog(id);
  }

  if (!blog) notFound();

  return (
    <main className="min-h-screen bg-dark-50 px-4 py-10">
      <div className="mx-auto max-w-4xl rounded-lg bg-white p-6 shadow-luxury">
        <Link href="/admin/dashboard" className="text-sm font-semibold text-gold-700">
          Back to dashboard
        </Link>
        <h1 className="mt-4 text-4xl">Edit Blog Post</h1>
        <AdminBlogEditor initialBlog={blog} />
      </div>
    </main>
  );
}
