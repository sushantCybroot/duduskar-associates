"use client";

import Image from "next/image";
import { useState } from "react";

const NEXT_IMAGE_HOSTS = new Set(["res.cloudinary.com", "images.unsplash.com"]);
const FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=1200&q=80";

const canUseNextImage = (src: string) => {
  if (src.startsWith("/")) return true;

  try {
    const url = new URL(src);
    return NEXT_IMAGE_HOSTS.has(url.hostname);
  } catch {
    return false;
  }
};

export default function BlogImage({
  src,
  alt,
  priority,
  sizes,
}: {
  src: string;
  alt: string;
  priority?: boolean;
  sizes: string;
}) {
  const [hasError, setHasError] = useState(false);
  const imageSrc = hasError || !src ? FALLBACK_IMAGE : src;

  if (canUseNextImage(imageSrc)) {
    return (
      <Image
        src={imageSrc}
        alt={alt}
        fill
        className="object-cover"
        sizes={sizes}
        priority={priority}
        onError={() => setHasError(true)}
      />
    );
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={imageSrc}
      alt={alt}
      className="h-full w-full object-cover"
      loading={priority ? "eager" : "lazy"}
      onError={() => setHasError(true)}
    />
  );
}
