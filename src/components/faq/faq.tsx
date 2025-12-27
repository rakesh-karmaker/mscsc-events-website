import { Activity, type ReactNode } from "react";
import FaqLeft from "./faq-left";
import FaqRight from "./faq-right";
import ContactBox from "./contact-box";
import { useEventData } from "@/hooks/use-event-data";

export default function Faq(): ReactNode {
  // Fetch event data using the custom hook
  const { faqData } = useEventData();
  if (!faqData || faqData.length === 0) {
    return null;
  }

  return (
    <section
      id="faqs"
      className="w-full h-full my-16 mb-0 bg-secondary-bg py-13 flex justify-center border-b-2 border-primary "
    >
      <div className="w-full max-w-max-width flex gap-8 justify-between max-lg:flex-col max-lg:gap-10">
        <FaqLeft />
        <FaqRight faqData={faqData} />
        <Activity mode={window.innerWidth < 1024 ? "visible" : "hidden"}>
          <ContactBox />
        </Activity>
      </div>
    </section>
  );
}
