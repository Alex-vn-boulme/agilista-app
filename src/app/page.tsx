import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import { AssistantExplanation } from "@/components/sections/assistant-explanation";
import AutomationGrid from "@/components/sections/automation-grid";
import Control from "@/components/sections/control";
import Features from "@/components/sections/features";
import Hero from "@/components/sections/hero";
import HowItWorks from "@/components/sections/how-it-works";
import Security from "@/components/sections/security";
import UseCases from "@/components/sections/use-cases";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-[#F8F7FF]">
      <Navbar />

      <Hero />
      <AssistantExplanation />

      {/* Automation Grid Section */}
      <AutomationGrid />

      {/* Features Section */}
      <Features />

      {/* How It Works Section */}
      <HowItWorks />

      {/* Control Section */}
      <Control />

      {/* Use Cases Section */}
      <UseCases />

      {/* Security Section */}
      <Security />

      <Footer />
    </div>
  );
}
