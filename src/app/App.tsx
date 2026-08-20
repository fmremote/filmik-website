import { useEffect, useState } from "react";
import { Navigation } from "./components/Navigation";
import { Hero } from "./components/Hero";
import { LogoCloud } from "./components/LogoCloud";
import { ProductionTeams } from "./components/ProductionTeams";
import { Features } from "./components/Features";
import { ProductShowcase } from "./components/ProductShowcase";
import { PerformerSection } from "./components/PerformerSection";
import { CoordinatorSection } from "./components/CoordinatorSection";
import { Pricing } from "./components/Pricing";
import { Testimonials } from "./components/Testimonials";
import { Community } from "./components/Community";
import { FinalCTA } from "./components/FinalCTA";
import { Footer } from "./components/Footer";
import { RequestAccessModal } from "./components/RequestAccessModal";
import { trackEvent, trackPageView } from "../lib/analytics";

export default function App() {
  const [isWorkflowVideoOpen, setIsWorkflowVideoOpen] = useState(false);
  const [isRequestAccessOpen, setIsRequestAccessOpen] = useState(false);

  useEffect(() => {
    trackPageView(window.location.pathname);

    const handleClick = (event: MouseEvent) => {
      const target =
        event.target instanceof Element
          ? event.target.closest<HTMLElement>("[data-analytics-event]")
          : null;

      if (!target) return;

      trackEvent(target.dataset.analyticsEvent || "interaction", {
        label: target.dataset.analyticsLabel,
        location: target.dataset.analyticsLocation,
        href: target.getAttribute("href") || undefined,
      });
    };

    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);

  const openWorkflowVideo = (location: string) => {
    trackEvent("workflow_video_open", { location });
    setIsWorkflowVideoOpen(true);
  };

  const closeWorkflowVideo = () => {
    trackEvent("workflow_video_close", { location: "workflow_modal" });
    setIsWorkflowVideoOpen(false);
  };

  const openRequestAccess = (location: string) => {
    trackEvent("request_access_open", { location });
    setIsRequestAccessOpen(true);
  };

  const closeRequestAccess = () => {
    trackEvent("request_access_close", { location: "request_access_modal" });
    setIsRequestAccessOpen(false);
  };

  return (
    <div className="min-h-screen bg-background pb-24 text-foreground md:pb-0">
      <Navigation
        onOpenWorkflowVideo={() => openWorkflowVideo("navigation")}
        onOpenRequestAccess={() => openRequestAccess("navigation")}
      />
      <main>
        <Hero
          isWorkflowVideoOpen={isWorkflowVideoOpen}
          onOpenWorkflowVideo={() => openWorkflowVideo("hero")}
          onCloseWorkflowVideo={closeWorkflowVideo}
          onOpenRequestAccess={() => openRequestAccess("hero")}
        />
        <LogoCloud />
        <ProductionTeams />
        <ProductShowcase />
        <Pricing />
        <Features />
        <CoordinatorSection />
        <PerformerSection />
        <Testimonials />
        <Community />
        <FinalCTA />
      </main>
      <Footer />
      <RequestAccessModal open={isRequestAccessOpen} onOpenChange={setIsRequestAccessOpen} onClose={closeRequestAccess} />
    </div>
  );
}
