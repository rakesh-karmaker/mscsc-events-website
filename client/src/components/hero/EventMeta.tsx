import type { ReactNode } from "react";
import { FaClock, FaLocationDot } from "react-icons/fa6";
import { GoPlus } from "react-icons/go";

export default function EventMeta({
  eventDate,
  eventLocation,
}: {
  eventDate: string;
  eventLocation: string;
}): ReactNode {
  return (
    <div className="relative w-fit h-fit bg-white/60 backdrop-blur-[2px] px-4 py-2 flex justify-center items-center gap-5 border-1 border-light-gray">
      <div className="flex gap-1.5 items-center min-w-fit">
        <FaClock className="text-black" />
        <p className="text-black font-medium text-lg">{eventDate}</p>
      </div>
      <div className="w-0.5 h-6 bg-light-gray" />
      <div className="flex gap-1 items-center min-w-fit">
        <FaLocationDot className="text-black" />
        <p className="text-black font-medium text-lg">{eventLocation}</p>
      </div>
      <GoPlus className="absolute text-black/90 top-0 left-0 -translate-x-[52%] -translate-y-[52%] text-sm" />
      <GoPlus className="absolute text-black/90 top-0 right-0 translate-x-[55%] -translate-y-[52%] text-sm" />
      <GoPlus className="absolute text-black/90 bottom-0 left-0 -translate-x-[52%] translate-y-[55%] text-sm" />
      <GoPlus className="absolute text-black/90 bottom-0 right-0 translate-x-[55%] translate-y-[55%] text-sm" />
    </div>
  );
}
