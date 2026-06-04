import { redirect } from "next/navigation";
import AdminLoginForm from "@/components/AdminLoginForm";
import { getSession } from "@/lib/auth";

export const metadata = {
  title: "Admin Login | Duduskar & Associates",
};

export default async function AdminLoginPage() {
  const session = await getSession();
  if (session) redirect("/admin/dashboard");

  return (
    <main className="flex min-h-screen items-center justify-center bg-dark-50 px-4 py-12">
      <AdminLoginForm />
    </main>
  );
}
