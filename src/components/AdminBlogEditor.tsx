"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { BLOG_CATEGORIES } from "@/lib/constants";
import { ValidationErrors } from "@/lib/validation";

type InitialBlog = {
  id?: string;
  title?: string;
  excerpt?: string;
  content?: string;
  category?: string;
  tags?: string[];
  featuredImage?: string;
  published?: boolean;
};

export default function AdminBlogEditor({ initialBlog }: { initialBlog?: InitialBlog }) {
  const router = useRouter();
  const [form, setForm] = useState({
    title: initialBlog?.title || "",
    excerpt: initialBlog?.excerpt || "",
    content: initialBlog?.content || "",
    category: initialBlog?.category || BLOG_CATEGORIES[0],
    tags: initialBlog?.tags?.join(", ") || "",
    featuredImage: initialBlog?.featuredImage || "",
    published: initialBlog?.published ?? true,
  });
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [isSaving, setIsSaving] = useState(false);

  const setField = (field: keyof typeof form, value: string | boolean) => {
    setForm((current) => ({ ...current, [field]: value }));
  };

  const save = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsSaving(true);
    setMessage("");
    setErrors({});

    const response = await fetch(
      initialBlog?.id ? `/api/blogs/${initialBlog.id}` : "/api/blogs",
      {
        method: initialBlog?.id ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          tags: form.tags
            .split(",")
            .map((tag) => tag.trim())
            .filter(Boolean),
        }),
      }
    );
    const data = await response.json();
    setIsSaving(false);

    if (!response.ok) {
      setMessage(data.message || "Unable to save blog post.");
      setErrors(data.errors || {});
      return;
    }

    router.push("/admin/dashboard");
    router.refresh();
  };

  return (
    <form onSubmit={save} className="grid gap-6">
      <input
        value={form.title}
        onChange={(event) => setField("title", event.target.value)}
        placeholder="Article title"
        className="rounded-lg border border-dark-200 px-4 py-3 text-2xl font-semibold"
        required
      />
      {errors.title && <p className="-mt-4 text-sm text-red-600">{errors.title}</p>}
      <textarea
        value={form.excerpt}
        onChange={(event) => setField("excerpt", event.target.value)}
        placeholder="Short excerpt"
        rows={3}
        className="rounded-lg border border-dark-200 px-4 py-3"
        required
      />
      {errors.excerpt && <p className="-mt-4 text-sm text-red-600">{errors.excerpt}</p>}
      <div className="grid gap-4 md:grid-cols-2">
        <select
          value={form.category}
          onChange={(event) => setField("category", event.target.value)}
          className="rounded-lg border border-dark-200 px-4 py-3"
        >
          {BLOG_CATEGORIES.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
        <input
          value={form.featuredImage}
          onChange={(event) => setField("featuredImage", event.target.value)}
          placeholder="Direct image URL, not a webpage link (optional)"
          className="rounded-lg border border-dark-200 px-4 py-3"
        />
      </div>
      <p className="-mt-4 text-xs text-dark-500">
        Use a direct image link such as a .jpg, .png, .webp, Unsplash image URL, or Cloudinary URL.
      </p>
      {errors.category && <p className="-mt-4 text-sm text-red-600">{errors.category}</p>}
      {errors.featuredImage && (
        <p className="-mt-4 text-sm text-red-600">{errors.featuredImage}</p>
      )}
      <input
        value={form.tags}
        onChange={(event) => setField("tags", event.target.value)}
        placeholder="Tags, separated by commas"
        className="rounded-lg border border-dark-200 px-4 py-3"
      />
      <textarea
        value={form.content}
        onChange={(event) => setField("content", event.target.value)}
        placeholder="Article content"
        rows={14}
        className="rounded-lg border border-dark-200 px-4 py-3"
        required
      />
      {errors.content && <p className="-mt-4 text-sm text-red-600">{errors.content}</p>}
      <label className="flex items-center gap-3 text-sm font-semibold">
        <input
          type="checkbox"
          checked={form.published}
          onChange={(event) => setField("published", event.target.checked)}
          className="h-5 w-5"
        />
        Published
      </label>
      {message && <p className="rounded-lg bg-red-50 p-3 text-sm text-red-700">{message}</p>}
      <button
        type="submit"
        disabled={isSaving}
        className="w-full rounded-lg bg-gold-500 px-5 py-3 font-semibold text-dark-950 transition hover:bg-gold-600 disabled:opacity-60 md:w-fit"
      >
        {isSaving ? "Saving..." : "Save Blog Post"}
      </button>
    </form>
  );
}
