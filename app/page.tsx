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
import { SITE_NAME, SITE_DESCRIPTION } from "@/lib/constants";

export const metadata = {
  title: `${SITE_NAME} - Premium Legal Services in Thane`,
  description: SITE_DESCRIPTION,
};

export default function Home() {
  return (
    <>
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
