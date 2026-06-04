import Link from "next/link";
import { redirect } from "next/navigation";
import AdminBlogEditor from "@/components/AdminBlogEditor";
import { getSession } from "@/lib/auth";

export const metadata = {
  title: "Create Blog | Duduskar & Associates",
};

export default async function CreateBlogPage() {
  const session = await getSession();
  if (!session) redirect("/admin/login");

  return (
    <main className="min-h-screen bg-dark-50 px-4 py-10">
      <div className="mx-auto max-w-4xl rounded-lg bg-white p-6 shadow-luxury">
        <Link href="/admin/dashboard" className="text-sm font-semibold text-gold-700">
          Back to dashboard
        </Link>
        <h1 className="mt-4 text-4xl">Create Blog Post</h1>
        <AdminBlogEditor />
      </div>
    </main>
  );
}
