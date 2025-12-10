import type { ReactNode } from "react";
import ContactInfo from "./ContactInfo";
import ContactForm from "../forms/ContactForm";
import { useEventData } from "@/hooks/useEventData";

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
    <section
      id="contact"
      className="w-full h-full overflow-x-hidden max-w-max-width flex justify-between items-center gap-10 max-lg:flex-col max-lg:items-start"
    >
      <ContactInfo
        contactData={contactLinks}
        eventName={eventMetaData.eventName}
      />
      <ContactForm />
    </section>
  );
}
