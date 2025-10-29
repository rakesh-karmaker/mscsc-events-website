import websiteData from "@/services/data/websiteData.json";
import Hero from "@/components/hero/Hero";
import Video from "@/components/Video";
import About from "@/components/about/About";
import Segments from "@/components/segments/Segments";
import Schedule from "@/components/schedule/Schedule";
import Sponsors from "@/components/Sponsors";
import Faq from "@/components/faq/Faq";
import Contact from "@/components/contact/Contact";
import type { ReactNode } from "react";

export default function Home(): ReactNode {
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
