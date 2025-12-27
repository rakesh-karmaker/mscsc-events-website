import type { ReactNode } from "react";
import { Link } from "react-router";
import Icon from "./icon";
import formatUrl from "@/utils/format-url";
import capitalize from "@/utils/capitalize";

type SocialIconsProps = {
  contactLinks: { [platform: string]: string };
};

export default function SocialIcons({
  contactLinks,
}: SocialIconsProps): ReactNode {
  return (
    <div className="w-fit h-fit flex items-center gap-3">
      {Object.entries(contactLinks).map(([platform, url]) => {
        return (
          <Link
            key={platform}
            to={formatUrl(platform, url)}
            target="_blank"
            rel="noopener noreferrer"
            className="text-white group relative w-10.25 h-10.25 flex items-center justify-center rounded-full bg-primary border-2 border-primary hover:bg-secondary-bg hover:text-primary focus:bg-light-gray/40 focus:text-black transition-colors duration-200"
          >
            <Icon iconName={platform} className="inline-block text-lg p-0" />
            <span className="pointer-events-none absolute top-3 text-xs text-white p-2 rounded-sm bg-primary opacity-0 group-hover:opacity-100 group-hover:-top-8 transition-all duration-300 whitespace-nowrap">
              {capitalize(platform)}
            </span>
          </Link>
        );
      })}
    </div>
  );
}
