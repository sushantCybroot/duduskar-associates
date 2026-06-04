import { BlogPost } from "@/types";

type BlogDocumentLike = {
  _id?: unknown;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  featuredImage?: string;
  author?: {
    _id?: unknown;
    firstName?: string;
    lastName?: string;
  } | null;
  category: string;
  tags?: string[];
  published?: boolean;
  viewCount?: number;
  seo?: {
    metaDescription?: string;
    keywords?: string[];
    ogImage?: string;
  };
  createdAt?: Date;
  updatedAt?: Date;
};

export const sampleBlogs: BlogPost[] = [
  {
    id: "sample-1",
    title: "How Civil Litigation Moves Through the Court System",
    slug: "civil-litigation-court-process",
    excerpt:
      "A practical overview of pleadings, interim relief, evidence, and final hearing stages for civil disputes.",
    content:
      "Civil litigation is a structured process that rewards preparation. A dispute usually begins with notice, pleadings, and interim applications where urgent protection may be required. Evidence then becomes central: documents, witness statements, and cross-examination shape how the court sees the matter. A good strategy is not only about arguing forcefully, but also about choosing which facts to prove, which records to preserve, and when negotiation can protect the client better than prolonged litigation.",
    featuredImage:
      "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=1200&q=80",
    author: { id: "firm", name: "Duduskar & Associates" },
    category: "Civil Litigation",
    tags: ["litigation", "courts", "procedure"],
    published: true,
    viewCount: 0,
    seo: {
      metaDescription:
        "Understand the major stages of civil litigation and how careful preparation helps protect your interests.",
      keywords: ["civil litigation", "court process", "legal strategy"],
      ogImage:
        "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=1200&q=80",
    },
    createdAt: new Date("2026-01-15"),
    updatedAt: new Date("2026-01-15"),
  },
  {
    id: "sample-2",
    title: "Property Due Diligence Before You Sign",
    slug: "property-due-diligence-before-signing",
    excerpt:
      "Key checks buyers should complete before executing property documents or releasing major payments.",
    content:
      "Property transactions deserve careful title scrutiny. Buyers should review ownership records, encumbrances, municipal permissions, revenue entries, possession history, and society documentation where applicable. The goal is to identify hidden claims before money changes hands. A properly drafted agreement should also define payment milestones, representations, indemnities, timelines, and dispute resolution mechanisms.",
    featuredImage:
      "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=1200&q=80",
    author: { id: "firm", name: "Duduskar & Associates" },
    category: "Property Law",
    tags: ["property", "title search", "due diligence"],
    published: true,
    viewCount: 0,
    seo: {
      metaDescription:
        "A concise guide to property title checks, encumbrances, and agreement safeguards before signing.",
      keywords: ["property lawyer", "title search", "property due diligence"],
      ogImage:
        "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=1200&q=80",
    },
    createdAt: new Date("2026-02-10"),
    updatedAt: new Date("2026-02-10"),
  },
];

export const serializeBlog = (doc: BlogDocumentLike): BlogPost => ({
  id: String(doc._id),
  title: doc.title,
  slug: doc.slug,
  content: doc.content,
  excerpt: doc.excerpt,
  featuredImage: doc.featuredImage || "",
  author: {
    id: doc.author?._id ? String(doc.author._id) : "firm",
    name: doc.author?.firstName
      ? `${doc.author.firstName} ${doc.author.lastName || ""}`.trim()
      : "Duduskar & Associates",
  },
  category: doc.category,
  tags: doc.tags || [],
  published: Boolean(doc.published),
  viewCount: doc.viewCount || 0,
  seo: {
    metaDescription: doc.seo?.metaDescription || doc.excerpt,
    keywords: doc.seo?.keywords || doc.tags || [],
    ogImage: doc.seo?.ogImage || doc.featuredImage || "",
  },
  createdAt: doc.createdAt || new Date(),
  updatedAt: doc.updatedAt || new Date(),
});
