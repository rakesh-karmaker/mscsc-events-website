import animateFadeUp from "@/animations/fade-up";
import animateTextReveal from "@/animations/text-reveal";
import { useEventData } from "@/hooks/useEventData";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef, type ReactNode } from "react";

gsap.registerPlugin(useGSAP);
gsap.registerPlugin(ScrollTrigger);

export default function Sponsors(): ReactNode {
  // Fetch event data using the custom hook
  const { eventMetaData, spData } = useEventData();
  if (!spData || spData.length === 0 || !eventMetaData) {
    return null;
  }

  const headingRef = useRef<HTMLHeadingElement>(null);
  const subheadingRef = useRef<HTMLParagraphElement>(null);
  const sponsorContainerRefs = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (
      headingRef.current &&
      subheadingRef.current &&
      sponsorContainerRefs.current
    ) {
      animateTextReveal(headingRef.current);
      animateFadeUp(subheadingRef.current);
      gsap.utils
        .toArray<HTMLElement>(sponsorContainerRefs.current.children)
        .forEach((element, index) => {
          gsap.fromTo(
            element,
            { opacity: 0, scale: 0.95 },
            {
              opacity: 1,
              scale: 1,
              duration: 0.6,
              delay: 0.3 + index * 0.1,
              ease: "power2.out",
              scrollTrigger: {
                trigger: element,
              },
            }
          );
        });
    }
  }, []);
  return (
    <section
      id="sponsors"
      className="w-full max-w-max-width my-16 flex flex-col gap-12"
    >
      <div className="w-full flex flex-col gap-3">
        <h2 className="text-5xl font-semibold gradient-text" ref={headingRef}>
          Powered by Our Partners
        </h2>
        <p
          className="text-[1.1rem]/[135%] text-text max-w-[40ch]"
          ref={subheadingRef}
        >
          {eventMetaData.eventName} is made possible through the generous
          support of our sponsors and partners.
        </p>
      </div>
      <div
        className="w-full grid grid-cols-5 max-xl:grid-cols-4 max-lg:grid-cols-3 max-sm:grid-cols-2 max-[450px]:!grid-cols-1"
        ref={sponsorContainerRefs}
      >
        {spData.map((sponsor, index) => (
          <a
            key={index}
            href={sponsor.websiteUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full h-[144px] py-4 relative flex justify-center items-center border-1 border-primary hover:bg-secondary-bg transition-colors duration-200"
          >
            <img
              src={sponsor.logoUrl}
              alt={sponsor.name}
              className="w-full max-w-[50%] max-[450px]:max-w-[40%] h-auto"
            />
          </a>
        ))}
      </div>
    </section>
  );
}
