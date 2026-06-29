import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import About from "@/components/About";
import PracticeAreas from "@/components/PracticeAreas";
import Team from "@/components/Team";
import WhyChooseUs from "@/components/WhyChooseUs";
import FAQ from "@/components/FAQ";
import ContactForm from "@/components/ContactForm";
import Footer from "@/components/Footer";
import ScrollProgress from "@/components/ScrollProgress";
import BackToTop from "@/components/BackToTop";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import { SITE_NAME, SITE_DESCRIPTION, SITE_URL, FIRM } from "@/lib/constants";
import { Metadata } from "next";
import Script from "next/script";

export const metadata: Metadata = {
  title: "Duduskar & Associates | Civil Litigation | MACT Claims",
  description: "Duduskar & Associates - 35+ years of trusted legal services. Expert in Civil Litigation, Motor Accident Claims (MACT), Property Law, Injunction Matters, and Legal Advisory in Thane and Mumbai.",
  keywords: [
    "best lawyer in thane",
    "law firm thane",
    "civil litigation",
    "motor accident claims",
    "MACT lawyer",
    "property lawyer",
    "best lawyer in mumbai",
    "legal services thane"
  ]
};

export default function Home() {
  // Schema markup for Local Business
  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": SITE_URL,
    name: SITE_NAME,
    address: {
      "@type": "PostalAddress",
      streetAddress: "First Floor, B Wing, JOE Apartment, 101, Edulji Rd, near Sharma Dairy, Charai",
      addressLocality: "Thane West",
      addressRegion: "Maharashtra",
      postalCode: "400601",
      addressCountry: "IN",
    },
    telephone: FIRM.phone,
    email: FIRM.email,
    url: SITE_URL,
    image: `${SITE_URL}/og-image.jpg`,
    priceRange: "$$",
    description: "Expert legal services in Civil Litigation, Motor Accident Claims, Property Law, and more.",
    foundingDate: "1989",
    areaServed: {
      "@type": "City",
      name: "Thane"
    },
    sameAs: [
      "https://www.facebook.com/duduskarassociates",
      "https://www.linkedin.com/company/duduskar-associates"
    ]
  };

  // Schema markup for Professional Service
  const professionalServiceSchema = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: SITE_NAME,
    image: `${SITE_URL}/og-image.jpg`,
    description: "Law firm specializing in Civil Litigation, Motor Accident Claims (MACT), Property Law, and Legal Advisory",
    address: {
      "@type": "PostalAddress",
      streetAddress: "First Floor, B Wing, JOE Apartment, 101, Edulji Rd",
      addressLocality: "Thane West",
      addressRegion: "Maharashtra",
      postalCode: "400601",
      addressCountry: "IN"
    },
    telephone: FIRM.phone,
    email: FIRM.email,
    url: SITE_URL,
    priceRange: "$$"
  };

  return (
    <>
      <Script
        id="local-business-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      <Script
        id="professional-service-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(professionalServiceSchema) }}
      />
      <ScrollProgress />
      <Navigation />
      <main className="min-h-screen">
        <Hero />
        <About />
        <PracticeAreas />
        <Team />
        <WhyChooseUs />
        <FAQ />
        <ContactForm />
      </main>
      <Footer />
      <BackToTop />
      <FloatingWhatsApp />
    </>
  );
}
