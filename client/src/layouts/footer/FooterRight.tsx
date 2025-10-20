import formatUrl from "@/utils/formatUrl";
import type { ReactNode } from "react";
import { Link, useLocation } from "react-router";

type FooterRightProps = {
  eventName: string;
  contactLinks: { [platform: string]: string };
  eventLocation: string;
  sections: string[];
};

export default function FooterRight({
  eventName,
  contactLinks,
  eventLocation,
  sections,
}: FooterRightProps): ReactNode {
  const currentUrl = useLocation().pathname;

  const contactLinkItems = [
    { platform: "Email", url: contactLinks.email, isLink: true },
    { platform: "Phone", url: contactLinks.phone, isLink: true },
    { platform: "Address", url: eventLocation, isLink: false },
  ];

  const formattedSections: Record<string, { name: string; url: string }> = {
    hero: {
      name: "Home",
      url: "#home",
    },
    about: {
      name: "About",
      url: "#about",
    },
    segments: {
      name: "Segments",
      url: "#segments",
    },
    schedule: {
      name: "Schedule",
      url: "#schedule",
    },
    "sponsors&partners": {
      name: "Sponsors",
      url: "#sponsors",
    },
    faqs: {
      name: "FAQs",
      url: "#faqs",
    },
    contact: {
      name: "Contact",
      url: "#contact",
    },
  };

  return (
    <div className="w-full border-l-1 border-light-gray flex flex-col gap-15 pt-26 pb-10 relative">
      <div className="ml-15 flex gap-42 mr-[calc((100vw-var(--max-width))/2)]">
        <div className="flex flex-col gap-6">
          <h3 className="text-[28px] font-semibold">Contact us</h3>
          <div className="flex flex-col gap-5">
            {contactLinkItems.map(({ platform, url, isLink }) => (
              <ContactLinkItem
                key={platform}
                platform={platform}
                url={url}
                isLink={isLink}
              />
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-6">
          <h3 className="text-[28px] font-semibold">Pages</h3>
          <div className="grid grid-cols-2 grid-rows-4 gap-x-16 gap-y-3">
            {Object.entries(formattedSections).map(
              ([section, { name, url }]) => {
                if (!sections.includes(section)) return null;

                return (
                  <Link
                    key={section}
                    to={`${currentUrl}${url}`}
                    className="transition-all duration-200 hover:text-blue"
                  >
                    {name}
                  </Link>
                );
              }
            )}
          </div>
        </div>
      </div>
      <p className="w-full pl-15 pr-[calc((100vw-var(--max-width))/2)] pt-10 border-t border-light-gray text-[1.1em]">
        <span>
          Copyright © {new Date().getFullYear()} {eventName} - All rights
          reserved || Designed By:{" "}
          <Link
            to="https://github.com/rakesh-karmaker"
            className="text-black/80 transition-all duration-200 hover:text-black/60"
          >
            Rakesh
          </Link>
        </span>
      </p>
    </div>
  );
}

function ContactLinkItem({
  platform,
  url,
  isLink,
}: {
  platform: string;
  url: string;
  isLink: boolean;
}): ReactNode {
  return (
    <div>
      <h4 className="font-semibold text-xl mb-0.75">{platform}</h4>
      {isLink ? (
        <Link
          to={formatUrl(platform, url)}
          className="transition-all duration-200 hover:text-blue"
        >
          {url}
        </Link>
      ) : (
        <pre className="text-lg">{url}</pre>
      )}
    </div>
  );
}
