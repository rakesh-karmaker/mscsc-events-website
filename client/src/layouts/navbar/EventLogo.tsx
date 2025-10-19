import type { ReactNode } from "react";
import { NavLink } from "react-router";

export default function EventLogo({
  logoUrl,
  eventName,
}: {
  logoUrl: string;
  eventName: string;
}): ReactNode {
  return (
    <NavLink
      to={"/"}
      className="px-4.25 py-2 shadow-[0px_0px_0px_1px_rgba(0,_0,_0,_0.1)] flex items-center gap-1.5 rounded-full bg-white hover:bg-light-gray/40 focus:bg-light-gray/40 focus-within:bg-light-gray/40 transition-all duration-200"
    >
      <img
        src={logoUrl}
        alt={`${eventName} Logo`}
        className="w-6.5 h-6.5 min-w-6.5 min-h-fit max-w-6.5 max-h-6.5 object-contain"
      />
      <span className="font-medium text-[0.95em]">{eventName}</span>
    </NavLink>
  );
}
