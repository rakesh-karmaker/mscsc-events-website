import animateFadeUp from "@/animations/fadeUp";
import animateTextReveal from "@/animations/textReveal";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { Activity, useRef, type ReactNode } from "react";
import ContactBox from "./ContactBox";

gsap.registerPlugin(useGSAP);

export default function FaqLeft(): ReactNode {
  const headingRef = useRef<HTMLHeadingElement>(null);
  const subHeadingRef = useRef<HTMLParagraphElement>(null);

  useGSAP(() => {
    if (headingRef.current && subHeadingRef.current) {
      animateTextReveal(headingRef.current);
      animateFadeUp(subHeadingRef.current);
    }
  }, []);

  return (
    <div className="w-full max-w-[500px] flex flex-col justify-between gap-10">
      <div className="w-full flex flex-col gap-3">
        <h2
          className="text-5xl max-w-[15ch] font-semibold max-xl:text-4xl"
          ref={headingRef}
        >
          Frequently asked questions
        </h2>
        <p
          className="text-[1.1rem]/[135%] max-xl:text-[1rem] text-black/90 max-w-[50ch]"
          ref={subHeadingRef}
        >
          Here are some quick answers about who we are, what the event holds,
          and where it will take place.
        </p>
      </div>

      <Activity mode={window.innerWidth >= 1024 ? "visible" : "hidden"}>
        <ContactBox />
      </Activity>
    </div>
  );
}
