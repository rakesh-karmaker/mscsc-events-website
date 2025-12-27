import animateTextReveal from "@/animations/text-reveal";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef, type ReactNode } from "react";
import HeroBgWave from "./ui/hero-bg-wave";

gsap.registerPlugin(useGSAP);

export default function RegistrationHeader(): ReactNode {
  const headingRef = useRef<HTMLHeadingElement>(null);

  useGSAP(() => {
    if (headingRef.current) {
      animateTextReveal(headingRef.current);
    }
  }, []);

  return (
    <div className="relative w-full h-fit py-4 bg-cover -mt-nav-height pt-[calc(var(--nav-height)+16px)] flex justify-center items-center before:z-10">
      <div className="relative z-20 w-full max-w-max-width h-[46vh] max-h-[450px] min-h-[350px] max-xl:min-h-[300px] max-md:min-h-0 max-md:h-[250px] max-sm:h-[200px] flex items-end pb-6">
        <h1
          className="text-pure-white text-8xl/[110%] max-xl:text-7xl max-md:text-5xl/[120%] max-sm:text-4xl/[130%] font-normal max-w-[20ch]"
          ref={headingRef}
        >
          Become a Part of <br /> the Scientific Experience
        </h1>
      </div>
      <div className="w-full h-full absolute top-0 left-0 max-w-screen overflow-hidden">
        <div className="w-screen max-w-[1920px] h-full min-h-full absolute top-0 -z-99 [@media(max-height:700px)]:pt-20 [@media(min-width:2000px)]:!min-h-[1000px]">
          <div className="w-fit max-w-screen h-full absolute -top-2 right-0 overflow-hidden">
            <HeroBgWave />
          </div>
          <div className="w-fit max-w-screen h-full absolute rotate-180 -bottom-2 left-0 overflow-hidden">
            <HeroBgWave />
          </div>
        </div>
      </div>
    </div>
  );
}
