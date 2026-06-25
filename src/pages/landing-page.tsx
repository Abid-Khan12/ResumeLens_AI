import { useEffect } from "react";

import { useTheme } from "@/providers/theme-provider";

import PricingSection from "@/components/landing/pricing-section";
import CTASection from "@/components/landing/cta-section";
import DashboardPreviewSection from "@/components/landing/dashboard-preview-section";
import FeatureSection from "@/components/landing/feature-section";
import Footer from "@/components/landing/footer";
import HeroSection from "@/components/landing/hero-section";
import HowItWorkSection from "@/components/landing/howitwork-section";
import Navbar from "@/components/landing/navbar";
import TestimonialSection from "@/components/landing/testimonials-section";
import OutComeSection from "@/components/landing/outcome-section";

function LandingPage() {
   const { setTheme } = useTheme();
   useEffect(() => {
      setTheme("light");
   }, [setTheme]);
   return (
      <div className="relative h-full w-full overflow-x-hidden">
         <Navbar />
         <main className="flex flex-col gap-16 sm:gap-28">
            <HeroSection />
            <DashboardPreviewSection />
            <FeatureSection />
            <HowItWorkSection />
            <OutComeSection />
            <TestimonialSection />
            <PricingSection />
            <CTASection />
         </main>
         <Footer />
      </div>
   );
}

export default LandingPage;
