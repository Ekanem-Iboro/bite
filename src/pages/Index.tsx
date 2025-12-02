import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { HeroSection } from "@/components/sections/HeroSection";
import { CuisineSection } from "@/components/sections/CuisineSection";
import { DietarySection } from "@/components/sections/DietarySection";
import { ValueProposition } from "@/components/sections/ValueProposition";
import { TestimonialsSection } from "@/components/sections/TestimonialsSection";
import { LeadFormSection } from "@/components/sections/LeadFormSection";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSection />
        <CuisineSection />
        <ValueProposition />
        <DietarySection />
        <TestimonialsSection />
        <LeadFormSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
