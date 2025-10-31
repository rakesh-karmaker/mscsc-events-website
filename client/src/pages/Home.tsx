import websiteData from "@/services/data/websiteData.json";
import Hero from "@/components/hero/Hero";
import Video from "@/components/Video";
import About from "@/components/about/About";
import Segments from "@/components/segments/Segments";
import Schedule from "@/components/schedule/Schedule";
import Sponsors from "@/components/Sponsors";
import Faq from "@/components/faq/Faq";
import Contact from "@/components/contact/Contact";
import { useEffect, type ReactNode } from "react";
import { useParams } from "react-router";
import { useLenis } from "lenis/react";

export default function Home(): ReactNode {
  const sectionId = useParams().section || "home";
  const lenis = useLenis();

  useEffect(() => {
    if (lenis) {
      // Use requestAnimationFrame to ensure scrolling happens after rendering
      requestAnimationFrame(() => {
        const section = document.getElementById(sectionId);
        if (section) {
          window.scrollTo({
            top: section.offsetTop - 100,
            behavior: "smooth",
          });
        }
      });
    }
  }, [sectionId, lenis]);

  return (
    <>
      <Hero
        eventDate={websiteData.eventDate}
        eventLocation={websiteData.eventLocation}
        heroData={websiteData.hero}
        isInnerRegistration={websiteData.isInnerRegistration}
        registrationUrl={websiteData.registrationUrl}
        sections={websiteData.sections}
      />
      <Video url={websiteData.video.url} />
      <About
        about={websiteData.about}
        isInnerRegistration={websiteData.isInnerRegistration}
        registrationUrl={websiteData.registrationUrl}
        contactLinks={websiteData.contactLinks}
        registrations={websiteData.registrations}
        segmentCount={websiteData.segments.length}
        prizeCount={websiteData.prizeCount}
      />
      <Segments segments={websiteData.segments} />
      <Schedule scheduleData={websiteData.schedule} />
      <Sponsors
        sponsorData={websiteData["sponsors&partners"]}
        eventName={websiteData.eventName}
      />
      <Faq faqData={websiteData.faqs} />
      <Contact
        contactData={websiteData.contactLinks}
        eventName={websiteData.eventName}
      />
    </>
  );
}
