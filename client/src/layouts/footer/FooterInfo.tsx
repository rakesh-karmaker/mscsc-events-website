import PrimaryBtn from "@/components/ui/PrimaryBtn";
import SocialIcons from "@/components/ui/SocialIcons";
import type { ReactNode } from "react";
import { useParams } from "react-router";

type FooterInfoProps = {
  footerData: {
    eventName: string;
    eventDescription: string;
    contactLinks: { [platform: string]: string };
    isInnerRegistration: boolean;
    registrationUrl: string;
  };
};

export default function FooterInfo({ footerData }: FooterInfoProps): ReactNode {
  const eventId = useParams().eventId;

  const registrationLink = footerData.isInnerRegistration
    ? `/registration/${eventId}`
    : footerData.registrationUrl;

  return (
    <div className="max-w-[530px] flex flex-col justify-between pt-[105px] pb-10">
      <div className="flex flex-col gap-5">
        <h3 className="font-medium text-5xl">{footerData.eventName}</h3>
        <div>
          <p className="text-[1.1em]/[145%] mb-3.75">
            {footerData.eventDescription}
          </p>
          <PrimaryBtn
            className="!px-5 text-[1.08em]"
            isLink={true}
            href={registrationLink}
          >
            Register Now
          </PrimaryBtn>
        </div>
      </div>
      <SocialIcons contactLinks={footerData.contactLinks} />
    </div>
  );
}
