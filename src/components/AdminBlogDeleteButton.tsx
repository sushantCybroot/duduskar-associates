"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function AdminBlogDeleteButton({
  blogId,
  title,
}: {
  blogId: string;
  title: string;
}) {
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);
  const [message, setMessage] = useState("");

  const deleteBlog = async () => {
    const confirmed = window.confirm(`Delete "${title}"? This cannot be undone.`);
    if (!confirmed) return;

    setIsDeleting(true);
    setMessage("");

    const response = await fetch(`/api/blogs/${blogId}`, { method: "DELETE" });
    const data = await response.json();
    setIsDeleting(false);

    if (!response.ok) {
      setMessage(data.message || "Unable to delete blog post.");
      return;
    }

    router.refresh();
  };

  return (
    <div className="flex flex-col gap-1">
      <button
        type="button"
        onClick={deleteBlog}
        disabled={isDeleting}
        className="rounded-lg border border-red-200 px-4 py-2 text-sm font-semibold text-red-700 transition hover:bg-red-50 disabled:opacity-60"
      >
        {isDeleting ? "Deleting..." : "Delete"}
      </button>
      {message && <span className="max-w-40 text-xs text-red-600">{message}</span>}
    </div>
  );
}
