import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import IntroSection from "@/components/IntroSection";
import MissionSection from "@/components/MissionSection";
import ServicesSection from "@/components/ServicesSection";
import HowItWorks from "@/components/HowItWorks";
import PricingSection from "@/components/PricingSection";
import WhyUsSection from "@/components/WhyUsSection";
import VideoGallery from "@/components/VideoGallery";
import TestimonialsSection from "@/components/TestimonialsSection";
import ClientsSection from "@/components/ClientsSection";
import BookingForm from "@/components/BookingForm";
import Footer from "@/components/Footer";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";

const Index = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    const scrollTo = searchParams.get("scrollTo");
    if (scrollTo) {
      requestAnimationFrame(() => {
        document.getElementById(scrollTo)?.scrollIntoView({ behavior: "smooth" });
      });
      setSearchParams({}, { replace: true });
    }
  }, [searchParams, setSearchParams]);

  return (
    <div className="min-h-screen">
      <Navbar />
      <HeroSection />
      <IntroSection />
      <MissionSection />
      <ServicesSection />
      <HowItWorks />
      <PricingSection />
      <WhyUsSection />
      <VideoGallery />
      <TestimonialsSection />
      <ClientsSection />
      <BookingForm />
      <Footer />
      <FloatingWhatsApp />
    </div>
  );
};

export default Index;
