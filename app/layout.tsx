import type { Metadata } from "next";
import "../src/styles/globals.css";
import { SITE_NAME, SITE_DESCRIPTION, SITE_URL } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Best Lawyer in Thane & Mumbai | Civil Litigation | MACT | Property Law | Duduskar & Associates",
  description: "Duduskar & Associates - 35+ years of trusted legal services in Thane, Mumbai. Expert Civil Litigation, Motor Accident Claims (MACT), Property Matters, Injunction, Legal Advisory. Top rated law firm in Maharashtra.",
  keywords: [
    "best lawyer in thane",
    "law firm thane",
    "civil litigation lawyer thane",
    "motor accident claims thane",
    "property lawyer thane",
    "MACT lawyer",
    "injunction lawyer",
    "legal consultation thane",
    "best lawyer in mumbai",
    "lawyer near me",
    "advocate thane",
  ],
  metadataBase: new URL(SITE_URL),
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: SITE_URL,
    title: "Duduskar & Associates - Best Lawyer in Thane & Mumbai",
    description: "35+ years of trusted legal services. Expert in Civil Litigation, MACT, Property Law, and Legal Advisory.",
    siteName: SITE_NAME,
    images: [
      {
        url: `/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: SITE_NAME,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Duduskar & Associates - Best Lawyer in Thane",
    description: "Expert legal services in Civil Litigation, Motor Accident Claims, Property Law, and more.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  icons: {
    icon: "/law-image/favicon.jpg",
    apple: "/law-image/favicon.jpg",
  },
  alternates: {
    canonical: SITE_URL,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#0a0a0a" />
        <link rel="icon" type="image/jpeg" sizes="32x32" href="/law-image/favicon.jpg" />
        <link rel="shortcut icon" href="/law-image/favicon.jpg" />
        <link rel="apple-touch-icon" href="/law-image/favicon.jpg" />
      </head>
      <body className="bg-white text-dark-950 antialiased">
        {children}
      </body>
    </html>
  );
}
