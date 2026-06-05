import type { ReactNode } from "react";
import ContactInfo from "./contact-info";
import ContactForm from "../forms/contact-form";
import { useEventData } from "@/hooks/use-event-data";

export default function Contact(): ReactNode {
  // Fetch event data using the custom hook
  const { contactLinks, eventMetaData } = useEventData();
  if (
    !contactLinks ||
    Object.keys(contactLinks).length === 0 ||
    !eventMetaData
  ) {
    return null;
  }

  return (
    <div className="w-full h-full flex justify-center items-center border-t-2 border-primary">
      <section
        id="contact"
        className="w-full h-full overflow-x-hidden max-w-max-width grid grid-cols-2 justify-between items-center gap-10 max-xl:gap-0 max-lg:grid-cols-1"
      >
        <ContactInfo
          contactData={contactLinks}
          eventName={eventMetaData.eventName}
        />
        <ContactForm />
      </section>
    </div>
  );
}
