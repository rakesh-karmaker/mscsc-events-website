import animateFadeUp from "@/animations/fadeUp";
import animateTextReveal from "@/animations/textReveal";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef, type ReactNode } from "react";

gsap.registerPlugin(useGSAP);

export default function ContactHeading(): ReactNode {
  const headingRef = useRef<HTMLHeadingElement>(null);
  const subHeadingRef = useRef<HTMLParagraphElement>(null);

  useGSAP(() => {
    if (headingRef.current && subHeadingRef.current) {
      animateTextReveal(headingRef.current);
      animateFadeUp(subHeadingRef.current);
    }
  }, []);

  return (
    <div className="w-full flex flex-col gap-2">
      <p className="text-blue font-medium">Contact us</p>
      <div className="w-full flex flex-col">
        <div className="w-full flex flex-col gap-3">
          <h2
            className="text-5xl uppercase max-w-[16ch] font-semibold max-xl:text-4xl"
            ref={headingRef}
          >
            Drop us a message
          </h2>
          <p
            className="text-[1.1rem]/[135%] max-xl:text-[1rem] text-black/90 max-w-[50ch]"
            ref={subHeadingRef}
          >
            We’re here to help you at anytime ! Drop us a message, and our org
            will get back to you as soon as possible. Whether you have
            inquiries, feedback, or just want to say how can we help you.
          </p>
        </div>
      </div>
    </div>
  );
}
