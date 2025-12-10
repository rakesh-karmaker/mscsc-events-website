import type { ReactNode } from "react";
import { Link } from "react-router";
import Icon from "./Icon";
import formatUrl from "@/utils/formatUrl";

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
            className="text-white w-10.25 h-10.25 flex items-center justify-center rounded-full bg-blue hover:bg-light-gray/40 hover:text-black focus:bg-light-gray/40 focus:text-black transition-colors duration-200"
          >
            <Icon iconName={platform} className="inline-block text-lg p-0" />
          </Link>
        );
      })}
    </div>
  );
}
