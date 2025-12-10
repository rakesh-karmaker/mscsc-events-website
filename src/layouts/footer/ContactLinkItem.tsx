import formatUrl from "@/utils/formatUrl";
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
