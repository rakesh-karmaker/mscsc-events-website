import type { SegmentType } from "@/types/global-types";
import { type ReactNode } from "react";
import Icon from "../ui/icon";
import PrimaryBtn from "../ui/primary-btn";
import { FaArrowRight } from "react-icons/fa6";
import { useParams } from "react-router";
import { GoPeople } from "react-icons/go";
import { FaGlobeAsia } from "react-icons/fa";
import { IoLocationOutline } from "react-icons/io5";

export default function SegmentCard({
  segmentData,
}: {
  segmentData: SegmentType;
}): ReactNode {
  const eventId = useParams().eventId || "";

  const { icon, title, summary } = segmentData;

  return (
    <div className="w-full h-full pl-1.5 pb-1.5 relative group">
      <div className="w-full h-full p-6 bg-primary-bg rounded-md border-2 border-primary flex flex-col gap-6 relative z-99 group-hover:-translate-x-1.5 group-hover:translate-y-1.5 transition-transform cursor-pointer">
        <div className="w-full h-full flex flex-col gap-3">
          <div className="w-20 h-20 rounded-md relative">
            <div className="w-20 h-20 rounded-md bg-primary flex justify-center items-center group-hover:rotate-5 transition-transform origin-bottom-right">
              <Icon iconName={icon} className="text-5xl text-white" />
            </div>
            <div className="w-full h-full absolute top-0 left-0 border-2 border-primary rounded-md z-999"></div>
          </div>
          <div className="w-full flex flex-col gap-3">
            <h3 className="text-2xl font-medium text-primary">{title}</h3>
            <div className="w-full flex flex-col gap-2">
              <div className="w-full flex gap-3">
                <div className="px-3 py-1.5 bg-primary rounded-sm text-white flex gap-1.5 items-center">
                  <GoPeople />
                  <p>{segmentData.teamType}</p>
                </div>
                <div className="px-3 py-1.5 bg-primary rounded-sm text-white flex gap-1.5 items-center">
                  {segmentData.locationType === "online" ? (
                    <FaGlobeAsia />
                  ) : (
                    <IoLocationOutline />
                  )}
                  <p>{segmentData.locationType}</p>
                </div>
              </div>
              <p className="text-[1rem]/[135%] text-text">{summary}</p>
            </div>
          </div>
        </div>
        <PrimaryBtn
          isLink={true}
          href={`/segments/${eventId}/${segmentData.segmentSlug}`}
          className="flex items-center group-hover:after:w-full! group-hover:after:left-0! group-hover:after:top-0! group-hover:text-primary!"
        >
          Learn More{" "}
          <FaArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
        </PrimaryBtn>
      </div>
      <div className="absolute w-[calc(100%-0.375rem)] h-[calc(100%-0.375rem)] border-2 border-primary rounded-md bottom-0 left-0 bg-secondary-bg"></div>
    </div>
  );
}
