import type { ReactNode } from "react";
import ContactInfo from "./ContactInfo";
import ContactForm from "../forms/ContactForm";

export default function Contact({
  contactData,
  eventName,
}: {
  contactData: { [platform: string]: string };
  eventName: string;
}): ReactNode {
  return (
    <section
      id="contact"
      className="w-full h-full overflow-x-hidden max-w-max-width flex justify-between items-center gap-10 max-lg:flex-col max-lg:items-start"
    >
      <ContactInfo contactData={contactData} eventName={eventName} />
      <ContactForm />
    </section>
  );
}
