import { QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { queryClient } from "@/lib/queryClient";
import { AuthProvider } from "@/context/AuthContext";
import { AuthGuard } from "@/components/AuthGuard";
import { AdminShell } from "@/components/AdminShell";
import { Toaster } from "@/components/ui/sonner";
import Login from "@/pages/Login";
import Dashboard from "@/pages/Dashboard";
import HeroSlides from "@/pages/HeroSlides";
import Services from "@/pages/Services";
import PricingPlans from "@/pages/PricingPlans";
import HowItWorks from "@/pages/HowItWorks";
import WhyUs from "@/pages/WhyUs";
import Testimonials from "@/pages/Testimonials";
import Clients from "@/pages/Clients";
import VideoGallery from "@/pages/VideoGallery";
import MissionAbout from "@/pages/MissionAbout";
import ContactInfo from "@/pages/ContactInfo";
import MediaLibrary from "@/pages/MediaLibrary";
import Bookings from "@/pages/Bookings";
import Orders from "@/pages/Orders";

function Protected({ children }: { children: React.ReactNode }) {
  return (
    <AuthGuard>
      <AdminShell>{children}</AdminShell>
    </AuthGuard>
  );
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Toaster />
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<Protected><Dashboard /></Protected>} />
            <Route path="/hero-slides" element={<Protected><HeroSlides /></Protected>} />
            <Route path="/services" element={<Protected><Services /></Protected>} />
            <Route path="/pricing-plans" element={<Protected><PricingPlans /></Protected>} />
            <Route path="/how-it-works" element={<Protected><HowItWorks /></Protected>} />
            <Route path="/why-us" element={<Protected><WhyUs /></Protected>} />
            <Route path="/testimonials" element={<Protected><Testimonials /></Protected>} />
            <Route path="/clients" element={<Protected><Clients /></Protected>} />
            <Route path="/video-gallery" element={<Protected><VideoGallery /></Protected>} />
            <Route path="/mission-about" element={<Protected><MissionAbout /></Protected>} />
            <Route path="/contact-info" element={<Protected><ContactInfo /></Protected>} />
            <Route path="/bookings" element={<Protected><Bookings /></Protected>} />
            <Route path="/orders" element={<Protected><Orders /></Protected>} />
            <Route path="/media" element={<Protected><MediaLibrary /></Protected>} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </QueryClientProvider>
  );
}
