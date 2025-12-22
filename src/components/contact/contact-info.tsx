import gsap from "gsap";
import { useRef, type ReactNode } from "react";
import ContactHeading from "./contact-heading";
import Icon from "../ui/icon";
import formatUrl from "@/utils/format-url";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP);
gsap.registerPlugin(ScrollTrigger);

export default function ContactInfo({
  contactData,
  eventName,
}: {
  contactData: { [platform: string]: string };
  eventName: string;
}): ReactNode {
  const iconsContainerRef = useRef<HTMLDivElement>(null);
  useGSAP(() => {
    if (iconsContainerRef.current) {
      gsap.utils
        .toArray<HTMLElement>(iconsContainerRef.current.children)
        .forEach((icon, index) => {
          gsap.fromTo(
            icon,
            { y: 30, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.6,
              delay: index * 0.2,
              scrollTrigger: {
                trigger: iconsContainerRef.current,
              },
            }
          );
        });
    }
  }, []);

  return (
    <div className="w-full max-w-[730px] border-r-2 max-lg:border-r-0 max-lg:border-b-2 max-lg:max-w-full border-primary py-16 pr-4">
      <div className="w-full max-w-[550px] flex flex-col gap-8">
        <ContactHeading />
        <div className="w-full flex flex-col gap-7" ref={iconsContainerRef}>
          <ContactItem
            heading="Call Us"
            icon="phone"
            url={formatUrl("phone", contactData.phone)}
            text={contactData.phone}
          />
          <ContactItem
            heading="Email Us"
            icon="email"
            url={formatUrl("email", contactData.email)}
            text={contactData.email}
          />
          <ContactItem
            heading="Facebook"
            icon="facebook"
            url={contactData.facebook}
            text={eventName + " on Facebook"}
          />
        </div>
      </div>
    </div>
  );
}

function ContactItem({
  icon,
  heading,
  url,
  text,
}: {
  icon: string;
  heading: string;
  url: string;
  text: string;
}): ReactNode {
  return (
    <div className="w-full flex gap-4 items-center">
      <div className="w-15 h-15 min-w-15 min-h-15 flex justify-center items-center bg-primary rounded-sm">
        <Icon iconName={icon} className="w-7 h-7 text-white" />
      </div>
      <div className="flex flex-col">
        <h4 className="text-2xl font-semibold uppercase text-primary">
          {heading}
        </h4>
        <div>
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary/70 hover:text-primary focus:text-primary transition-colors duration-200 "
          >
            {text}
          </a>
        </div>
      </div>
    </div>
  );
}
