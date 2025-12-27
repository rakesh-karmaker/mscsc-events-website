import type { ReactNode } from "react";
import FooterInfo from "./footer-info";
import FooterRight from "./footer-right";
import { useEventData } from "@/hooks/use-event-data";

export default function Footer(): ReactNode {
  const { eventMetaData, contactLinks, sections } = useEventData();

  if (!eventMetaData) {
    return null;
  }

  return (
    <footer className="relative border-t-2 border-primary w-full h-fit flex gap-32 pl-[calc((100%-var(--max-width))/2)] max-[1500px]:justify-between max-[1500px]:gap-12 max-[950px]:flex-col max-max-[950px]:self-center max-[950px]:pl-0 before:absolute before:w-full before:h-full before:bg-primary-bg before:left-0 before:top-0 before:-z-9999">
      <FooterInfo
        footerData={{
          eventName: eventMetaData.eventName,
          eventDescription: eventMetaData.eventDescription,
          contactLinks: contactLinks || {},
          isInnerRegistration: eventMetaData.isInnerRegistration,
          registrationUrl: eventMetaData.registrationUrl || "",
        }}
      />
      <FooterRight
        contactLinks={contactLinks || {}}
        eventLocation={eventMetaData.eventLocation}
        sections={sections}
      />
    </footer>
  );
}
