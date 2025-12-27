import PrimaryBtn from "@/components/ui/primary-btn";
import SocialIcons from "@/components/ui/social-icons";
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
  const eventId = useParams().eventId || "";

  const registrationLink = footerData.isInnerRegistration
    ? `${eventId}/registration/`
    : footerData.registrationUrl;

  return (
    <div className="max-w-132.5 flex flex-col justify-between pt-26.25 pb-10 max-[950px]:gap-12 max-[950px]:pb-0 max-[950px]:max-w-max-width max-[950px]:px-[calc((100vw-var(--max-width))/2)] max-[950px]:pt-16">
      <div className="flex flex-col gap-5 max-[950px]:gap-3">
        <h3 className="font-medium text-5xl max-sm:text-4xl gradient-text">
          {footerData.eventName}
        </h3>
        <div>
          <p className="text-[1.1em]/[145%] mb-3.75 max-sm:text-[1em]/[145%] text-text">
            {footerData.eventDescription}
          </p>
          <PrimaryBtn
            className="px-4.5! py-2.5! text-[1.08em]"
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
