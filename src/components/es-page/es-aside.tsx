import type { ReactNode } from "react";
import { NavLink, useParams } from "react-router";
import Icon from "../ui/icon";
import { useEventData } from "@/hooks/use-event-data";

type EventAsideProps = {
  activeSlug: string;
};

export default function EventAside({ activeSlug }: EventAsideProps): ReactNode {
  const eventId = useParams().eventId || "";
  const { experienceData, segmentData } = useEventData();

  return (
    <aside className="w-full h-fit max-w-75 sticky max-md:relative max-md:max-w-full max-md:top-0 top-[calc(var(--nav-height)+2rem)] border-2 border-primary bg-secondary-bg rounded-md flex flex-col gap-4">
      {segmentData && segmentData.length > 0 ? (
        <div className="w-full flex flex-col gap-3">
          <h2 className="text-3xl font-medium text-primary pb-2 pt-5 mx-5 border-b border-primary">
            Segments
          </h2>
          <menu className="w-full flex flex-col">
            {segmentData.map((segment) => (
              <li key={segment.title} className="w-full h-full">
                <NavLink
                  to={`/${eventId}/events/${segment.segmentSlug}`}
                  className={
                    "w-full h-full text-[0.99rem] text-text transition-colors py-2.5 px-5 hover:bg-primary/10 active:bg-primary/20 flex items-center gap-3 border-b border-primary/10" +
                    (activeSlug === segment.segmentSlug
                      ? " bg-light-orange/40!"
                      : "")
                  }
                >
                  <Icon iconName={segment.icon} className="text-xl" />{" "}
                  {segment.title}
                </NavLink>
              </li>
            ))}
          </menu>
        </div>
      ) : null}
      {experienceData && experienceData.length > 0 ? (
        <div className="w-full flex flex-col gap-3">
          <h2 className="text-3xl font-medium text-primary pb-2 pt-5 mx-5 border-b border-primary">
            Experiences
          </h2>
          <menu className="w-full flex flex-col">
            {experienceData.map((experience) => (
              <li key={experience.title} className="w-full h-full">
                <NavLink
                  to={`/${eventId}/events/${experience.experienceSlug}`}
                  className={
                    "w-full h-full text-[0.99rem] text-text transition-colors py-2.5 px-5 hover:bg-primary/10 active:bg-primary/20 flex items-center gap-3 border-b border-primary/10" +
                    (activeSlug === experience.experienceSlug
                      ? " bg-light-orange/40!"
                      : "")
                  }
                >
                  <Icon iconName={experience.icon} className="text-xl" />{" "}
                  {experience.title}
                </NavLink>
              </li>
            ))}
          </menu>
        </div>
      ) : null}
    </aside>
  );
}
