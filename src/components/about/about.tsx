import type { ReactNode } from "react";
import AboutTop from "./about-top";
import AboutBottom from "./about-bottom";
import { useEventData } from "@/hooks/use-event-data";

export default function About(): ReactNode {
  // Fetch event data using the custom hook
  const { eventMetaData, aboutData, sections, segmentData, contactLinks } =
    useEventData();
  if (!eventMetaData || !aboutData) {
    return null;
  }

  return (
    <section
      id="about"
      className="mb-6 mx-4 max-md:mx-0 w-fit max-w-440 h-full p-10 max-md:py-8 max-md:px-[calc((100vw-var(--max-width))/2)]! bg-secondary-bg rounded-xl max-xl:rounded-none flex flex-col gap-10 shadow-[0px_0px_0px_1px_rgba(255,255,255,0.05)]"
      style={{
        maxWidth: sections.includes("video") ? "110rem" : "var(--max-width)",
      }}
    >
      <AboutTop
        about={aboutData}
        isInnerRegistration={eventMetaData.isInnerRegistration}
        registrationUrl={eventMetaData.registrationUrl || ""}
        contactLinks={contactLinks || {}}
        isHomePage={eventMetaData.isHomepage}
      />
      {eventMetaData.isHomepage ? null : (
        <AboutBottom
          registrations={eventMetaData.registrations}
          segmentCount={segmentData?.length || 0}
          prizeCount={eventMetaData.prizeCount}
        />
      )}
    </section>
  );
}
