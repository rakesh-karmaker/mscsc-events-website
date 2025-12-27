import formatUrl from "@/utils/format-url";
import type { ReactNode } from "react";
import { Link } from "react-router";

export default function ContactLinkItem({
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
      <h4 className="font-semibold text-xl mb-0.75 text-primary">{platform}</h4>
      {isLink ? (
        <Link
          to={formatUrl(platform, url)}
          className="transition-all duration-200 hover:text-primary text-primary/70"
        >
          {url}
        </Link>
      ) : (
        <span className="text-lg">{url}</span>
      )}
    </div>
  );
}
