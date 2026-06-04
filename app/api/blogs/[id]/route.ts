import { NextRequest, NextResponse } from "next/server";
import { isValidObjectId } from "mongoose";
import dbConnect, { isProduction } from "@/lib/db";
import { Blog } from "@/lib/models";
import { getSession } from "@/lib/auth";
import { serializeBlog } from "@/lib/blogData";
import { deleteDevBlog, getDevBlog, updateDevBlog } from "@/lib/devBlogStore";
import { generateSlug, validateBlogForm } from "@/lib/validation";

export async function GET(_request: NextRequest, context: RouteContext<"/api/blogs/[id]">) {
  const { id } = await context.params;

  try {
    await dbConnect();
    const query = isValidObjectId(id) ? { $or: [{ _id: id }, { slug: id }] } : { slug: id };
    const blog = await Blog.findOne(query).lean();
    if (!blog) {
      return NextResponse.json({ success: false, message: "Blog not found" }, { status: 404 });
    }
    return NextResponse.json({ success: true, data: serializeBlog(blog) });
  } catch (error) {
    if (isProduction) {
      console.error("Fetch blog error:", error);
      return NextResponse.json(
        { success: false, message: "MongoDB is not configured for blogs." },
        { status: 503 }
      );
    }

    const blog = getDevBlog(id);
    if (!blog) {
      return NextResponse.json({ success: false, message: "Blog not found" }, { status: 404 });
    }
    return NextResponse.json({ success: true, data: blog, fallback: true });
  }
}

export async function PUT(request: NextRequest, context: RouteContext<"/api/blogs/[id]">) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
  }

  const { id } = await context.params;
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
      const blog = await Blog.findByIdAndUpdate(
        id,
        {
          title: body.title,
          slug: body.slug ? generateSlug(body.slug) : generateSlug(body.title),
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
        },
        { new: true }
      );

      if (!blog) {
        return NextResponse.json({ success: false, message: "Blog not found" }, { status: 404 });
      }

      return NextResponse.json({ success: true, data: serializeBlog(blog) });
    } catch (error) {
      if (process.env.NODE_ENV === "production") {
        throw error;
      }

      const blog = updateDevBlog(id, {
        title: body.title,
        excerpt: body.excerpt,
        content: body.content,
        category: body.category,
        tags: Array.isArray(body.tags) ? body.tags : [],
        featuredImage: body.featuredImage || "",
        published: Boolean(body.published),
        metaDescription: body.metaDescription,
      });

      if (!blog) {
        return NextResponse.json({ success: false, message: "Blog not found" }, { status: 404 });
      }

      return NextResponse.json({ success: true, data: blog, fallback: true });
    }
  } catch (error) {
    console.error("Update blog error:", error);
    return NextResponse.json({ success: false, message: "Unable to update blog." }, { status: 500 });
  }
}

export async function DELETE(_request: NextRequest, context: RouteContext<"/api/blogs/[id]">) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
  }

  const { id } = await context.params;
  try {
    try {
      await dbConnect();
      const deleted = await Blog.findByIdAndDelete(id);
      if (!deleted) {
        return NextResponse.json({ success: false, message: "Blog not found" }, { status: 404 });
      }
      return NextResponse.json({ success: true, message: "Blog deleted." });
    } catch (error) {
      if (process.env.NODE_ENV === "production") {
        throw error;
      }

      const deleted = deleteDevBlog(id);
      if (!deleted) {
        return NextResponse.json({ success: false, message: "Blog not found" }, { status: 404 });
      }
      return NextResponse.json({ success: true, message: "Blog deleted.", fallback: true });
    }
  } catch (error) {
    console.error("Delete blog error:", error);
    return NextResponse.json({ success: false, message: "Unable to delete blog." }, { status: 500 });
  }
}
