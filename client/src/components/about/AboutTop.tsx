import { useRef, type ReactNode } from "react";
import AboutInfo from "./AboutInfo";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SocialIcons from "../ui/SocialIcons";

gsap.registerPlugin(useGSAP);
gsap.registerPlugin(ScrollTrigger);

export type AboutTopProps = {
  about: { title: string; heading: string; text: string };
  isInnerRegistration: boolean;
  registrationUrl: string;
};

export default function AboutTop({
  about,
  isInnerRegistration,
  registrationUrl,
  contactLinks,
}: AboutTopProps & {
  contactLinks: { [platform: string]: string };
}): ReactNode {
  const imageRef = useRef<HTMLImageElement>(null);
  useGSAP(() => {
    if (imageRef.current) {
      gsap.fromTo(
        imageRef.current,
        { scale: 1.3 },
        {
          scale: 1,
          duration: 0.5,
          ease: "power3.out",
          scrollTrigger: {
            trigger: imageRef.current,
            start: "30% bottom",
          },
        }
      );
    }
  }, []);

  return (
    <div className="w-full h-full flex max-lg:flex-col gap-20 max-xl:gap-10 justify-between">
      <div className="w-full flex flex-col justify-between gap-10">
        <AboutInfo
          about={about}
          isInnerRegistration={isInnerRegistration}
          registrationUrl={registrationUrl}
        />
        <SocialIcons contactLinks={contactLinks} />
      </div>
      <div className="w-full h-full aspect-[1/0.9] max-xl:aspect-[1/1.1] max-lg:aspect-auto overflow-hidden rounded-lg shadow-md">
        <img
          ref={imageRef}
          src="/explorion/science-fest.jpg"
          alt="Science Fest"
          className="w-full h-full object-cover object-center"
        />
      </div>
    </div>
  );
}
