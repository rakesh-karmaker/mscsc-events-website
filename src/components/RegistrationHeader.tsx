import animateTextReveal from "@/animations/textReveal";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef, type ReactNode } from "react";

gsap.registerPlugin(useGSAP);

export default function RegistrationHeader(): ReactNode {
  const headingRef = useRef<HTMLHeadingElement>(null);

  useGSAP(() => {
    if (headingRef.current) {
      animateTextReveal(headingRef.current);
    }
  }, []);

  return (
    <div
      className="relative w-full h-fit py-4 bg-cover -mt-nav-height pt-[calc(var(--nav-height)+16px)] flex justify-center items-center before:absolute before:inset-0 before:bg-pure-black/69 before:z-10"
      style={{
        backgroundImage: "url('/register-bg.jpg')",
        backgroundSize: "100% 100%",
      }}
    >
      <div className="relative z-20 w-full max-w-max-width h-[46vh] max-h-[450px] min-h-[350px] max-xl:min-h-[300px] max-md:min-h-0 max-md:h-[250px] max-sm:h-[200px] flex items-end pb-6">
        <h1
          className="text-pure-white text-8xl/[110%] max-xl:text-7xl max-md:text-5xl/[120%] max-sm:text-4xl/[130%] font-normal max-w-[20ch]"
          ref={headingRef}
        >
          Become a Part of <br /> the Scientific Experience
        </h1>
      </div>
    </div>
  );
}
