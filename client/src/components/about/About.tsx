import type { ReactNode } from "react";
import AboutTop from "./AboutTop";
import AboutBottom from "./AboutBottom";

type AboutProps = {
  about: { title: string; heading: string; text: string };
  isInnerRegistration: boolean;
  registrationUrl: string;
  contactLinks: { [platform: string]: string };
  registrations: number;
  segmentCount: number;
  prizeCount: number;
};

export default function About({
  about,
  isInnerRegistration,
  registrationUrl,
  contactLinks,
  registrations,
  segmentCount,
  prizeCount,
}: AboutProps): ReactNode {
  return (
    <section
      id="about"
      className="mb-6 mx-4 max-md:mx-0 w-fit max-w-[1920px] h-full p-10 max-md:py-8 max-md:!px-[calc((100vw-var(--max-width))/2)]  bg-pure-white rounded-xl max-xl:rounded-none flex flex-col gap-10 shadow-[0px_0px_0px_1px_rgba(0,_0,_0,_0.05)]"
    >
      <AboutTop
        about={about}
        isInnerRegistration={isInnerRegistration}
        registrationUrl={registrationUrl}
        contactLinks={contactLinks}
      />
      <AboutBottom
        registrations={registrations}
        segmentCount={segmentCount}
        prizeCount={prizeCount}
      />
    </section>
  );
}
