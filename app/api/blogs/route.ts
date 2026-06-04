import { NextRequest, NextResponse } from "next/server";
import dbConnect, { isProduction } from "@/lib/db";
import { Blog } from "@/lib/models";
import { getSession } from "@/lib/auth";
import { serializeBlog } from "@/lib/blogData";
import { createDevBlog, getDevBlogs } from "@/lib/devBlogStore";
import { BLOG_CATEGORIES } from "@/lib/constants";
import { generateSlug, validateBlogForm } from "@/lib/validation";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const includeDrafts = searchParams.get("drafts") === "true";
  const category = searchParams.get("category");
  const q = searchParams.get("q");

  try {
    const session = await getSession();
    await dbConnect();

    const query: Record<string, unknown> = {};
    if (!includeDrafts || !session) query.published = true;
    if (category && BLOG_CATEGORIES.includes(category)) query.category = category;
    if (q) query.$text = { $search: q };

    const blogs = await Blog.find(query).sort({ createdAt: -1 }).limit(50).lean();
    return NextResponse.json({
      success: true,
      data: blogs.map(serializeBlog),
    });
  } catch (error) {
    if (isProduction) {
      console.error("Fetch blogs error:", error);
      return NextResponse.json(
        { success: false, message: "MongoDB is not configured for blogs." },
        { status: 503 }
      );
    }

    const filtered = getDevBlogs().filter((blog) => {
      const matchesCategory = !category || blog.category === category;
      const matchesQuery =
        !q ||
        `${blog.title} ${blog.excerpt} ${blog.content}`
          .toLowerCase()
          .includes(q.toLowerCase());
      return matchesCategory && matchesQuery;
    });

    return NextResponse.json({
      success: true,
      data: filtered,
      fallback: true,
      message: "Using sample blog content until MongoDB is configured.",
    });
  }
}

export async function POST(request: NextRequest) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const validationErrors = validateBlogForm(body);
    if (Object.keys(validationErrors).length > 0) {
      return NextResponse.json(
        { success: false, message: "Validation failed", errors: validationErrors },
        { status: 400 }
      );
    }

    try {
      await dbConnect();
      const slugBase = generateSlug(body.title);
      let slug = slugBase;
      let suffix = 1;
      while (await Blog.exists({ slug })) {
        suffix += 1;
        slug = `${slugBase}-${suffix}`;
      }

      const blog = await Blog.create({
        title: body.title,
        slug,
        excerpt: body.excerpt,
        content: body.content,
        category: body.category,
        tags: Array.isArray(body.tags) ? body.tags : [],
        featuredImage: body.featuredImage || "",
        published: Boolean(body.published),
        seo: {
          metaDescription: body.metaDescription || body.excerpt,
          keywords: Array.isArray(body.tags) ? body.tags : [],
          ogImage: body.featuredImage || "",
        },
      });

      return NextResponse.json({ success: true, data: serializeBlog(blog) }, { status: 201 });
    } catch (error) {
      if (process.env.NODE_ENV === "production") {
        throw error;
      }

      const blog = createDevBlog({
        title: body.title,
        excerpt: body.excerpt,
        content: body.content,
        category: body.category,
        tags: Array.isArray(body.tags) ? body.tags : [],
        featuredImage: body.featuredImage || "",
        published: Boolean(body.published),
        metaDescription: body.metaDescription,
      });

      return NextResponse.json({ success: true, data: blog, fallback: true }, { status: 201 });
    }
  } catch (error) {
    console.error("Create blog error:", error);
    return NextResponse.json(
      { success: false, message: "Unable to create blog post. Check MongoDB env vars." },
      { status: 500 }
    );
  }
}
