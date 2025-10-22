import type { ReactNode } from "react";
import FooterInfo from "./FooterInfo";
import FooterRight from "./FooterRight";

type FooterProps = {
  footerData: {
    eventName: string;
    eventLogoUrl: string;
    eventDescription: string;
    eventLocation: string;
    isInnerRegistration: boolean;
    registrationUrl: string;
    sections: string[];
    contactLinks: { [platform: string]: string };
  };
};

export default function Footer({ footerData }: FooterProps): ReactNode {
  return (
    <footer className="relative shadow-[0px_0px_0px_1px_rgba(0,_0,_0,_0.1)] w-full h-fit flex gap-32 pl-[calc((100%-var(--max-width))/2)] max-[1500px]:justify-between max-[1500px]:gap-12 max-[950px]:flex-col max-max-[950px]:self-center max-[950px]:pl-0 before:absolute before:w-full before:h-full before:bg-pure-white before:left-0 before:top-0 before:-z-9999">
      <FooterInfo
        footerData={{
          eventName: footerData.eventName,
          eventDescription: footerData.eventDescription,
          contactLinks: footerData.contactLinks,
          isInnerRegistration: footerData.isInnerRegistration,
          registrationUrl: footerData.registrationUrl,
        }}
      />
      <FooterRight
        eventName={footerData.eventName}
        contactLinks={footerData.contactLinks}
        eventLocation={footerData.eventLocation}
        sections={footerData.sections}
      />
    </footer>
  );
}
