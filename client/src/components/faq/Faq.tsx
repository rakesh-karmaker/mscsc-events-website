import type { FaqType } from "@/types/globalTypes";
import { Activity, type ReactNode } from "react";
import FaqLeft from "./FaqLeft";
import FaqRight from "./FaqRight";
import ContactBox from "./ContactBox";

export default function Faq({ faqData }: { faqData: FaqType[] }): ReactNode {
  return (
    <section
      id="faqs"
      className="w-full h-full my-16 mb-0 bg-pure-white py-13 flex justify-center"
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
