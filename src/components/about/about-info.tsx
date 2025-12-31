import { useRef, type ReactNode } from "react";
import PrimaryBtn from "@/components/ui/primary-btn";
import { FaArrowRight } from "react-icons/fa6";
import { useParams } from "react-router";
import type { AboutTopProps } from "./about-top";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import animateAboutInfo from "@/animations/about-info";

gsap.registerPlugin(useGSAP);

export default function AboutInfo({
  about,
  isInnerRegistration,
  registrationUrl,
  isHomePage,
}: AboutTopProps): ReactNode {
  const currentEventId = useParams().eventId || "";

  const { title, heading, text } = about;

  const titleRef = useRef<HTMLHeadingElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (titleRef.current && contentRef.current) {
      animateAboutInfo(titleRef.current, contentRef.current);
    }
  }, []);

  return (
    <div className="w-full h-full flex flex-col gap-7.5">
      <div className="w-full h-fit pb-3.5 border-b border-primary">
        <h2
          ref={titleRef}
          className="text-5xl max-xl:text-4xl font-semibold opacity-0 gradient-text"
        >
          {title}
        </h2>
      </div>
      <div className="w-full flex flex-col gap-7" ref={contentRef}>
        <h3 className="text-3xl max-md:text-2xl/[117%] max-xl:text-2xl font-medium text-primary">
          {heading}
        </h3>
        <div className="relative">
          <p className="text-[1.01em]/[136%] mb-4 text-text">{text}</p>
          <PrimaryBtn
            isLink={true}
            href={
              isHomePage
                ? "https://mscsc.netlify.app/"
                : isInnerRegistration
                  ? currentEventId + "/registration/"
                  : registrationUrl
            }
            className="flex gap-1.5 items-center z-99"
          >
            {isHomePage ? "Visit Page" : "Register Now"} <FaArrowRight />
          </PrimaryBtn>
        </div>
      </div>
    </div>
  );
}
