import { type ReactNode } from "react";
import { NavLink, useParams } from "react-router";

export default function EventLogo({
  logoUrl,
  eventName,
}: {
  logoUrl: string;
  eventName: string;
}): ReactNode {
  const eventId = useParams().eventId;

  return (
    <NavLink
      to={`/${eventId}`}
      className=" flex items-center gap-2 max-xl:gap-1.5 rounded-full"
    >
      <img
        src={logoUrl}
        alt={`${eventName} Logo`}
        className="w-9.5 h-9.5 min-w-9.5 min-h-fit max-w-9.5 max-h-9.5 object-contain max-xl:w-8 max-xl:h-8 max-xl:min-w-8 max-xl:max-w-8"
      />
      <span className="font-semibold text-[1.2em] max-xl:text-[1.1em] text-primary">
        {eventName}
      </span>
    </NavLink>
  );
}
