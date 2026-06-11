import PrimaryBtn from "@/components/ui/primary-btn";
import { TbCurrencyTaka } from "react-icons/tb";
import { FaGlobeAsia } from "react-icons/fa";
import { IoLocationOutline } from "react-icons/io5";
import { GoPeople } from "react-icons/go";
import Icon from "@/components/ui/icon";
import type { ExplorionSegmentType } from "@/types/event-data-types";
import Modal from "@mui/material/Modal";
import { LuX } from "react-icons/lu";
import type { User } from "@/types/user-data-types";
import type { ReactNode } from "react";
import { useState } from "react";
import TeamDetails from "./team-detils";

export default function SegmentPreviewCard({
  segmentInfo,
  eventSlug,
  isRegistered = false,
  userData,
}: {
  segmentInfo: ExplorionSegmentType;
  eventSlug: string;
  isRegistered: boolean;
  userData?: User;
}): ReactNode {
  const [detailsModelOpen, setDetailsModelOpen] = useState<boolean>(false);

  return (
    <div className="w-full h-full p-4 bg-primary-bg rounded-md border-2 border-primary flex flex-col relative z-9">
      <div className="w-full h-full flex flex-col gap-2">
        <div className="w-15 h-15 rounded-md relative">
          <div className="w-15 h-15 rounded-md bg-primary flex justify-center items-center group-hover:rotate-5 transition-transform origin-bottom-right">
            <Icon iconName={segmentInfo.icon} className="text-3xl text-white" />
          </div>
        </div>
        <div className="w-full flex flex-col gap-2">
          <h3 className="text-[1.4rem]/[125%] font-medium text-primary">
            {segmentInfo.title}
          </h3>
          <div className="w-full flex flex-col gap-2">
            <div className="w-full flex gap-1.5">
              <div className="px-2.25 py-1.5 bg-primary rounded-sm text-white flex gap-1.5 items-center text-sm">
                <GoPeople />
                <p>{segmentInfo.teamType}</p>
              </div>
              <div className="px-2.25 py-1.5 bg-primary rounded-sm text-white flex gap-1.5 items-center text-sm">
                {segmentInfo.locationType === "online" ? (
                  <FaGlobeAsia />
                ) : (
                  <IoLocationOutline />
                )}
                <p>{segmentInfo.locationType}</p>
              </div>
              {segmentInfo.isPaidSegment ? (
                <div className="px-2.25 py-1.5 bg-primary rounded-sm text-white flex gap-0.75 items-center text-sm">
                  <TbCurrencyTaka />
                  <p>{segmentInfo.fees}</p>
                </div>
              ) : null}
            </div>
            <p className="text-[1rem]/[135%] text-text">
              {segmentInfo.summary}
            </p>
          </div>
        </div>
      </div>
      {isRegistered ? (
        segmentInfo.teamType === "team" ? (
          <div className="w-full flex gap-2 mt-2">
            <PrimaryBtn onClick={() => setDetailsModelOpen(true)}>
              View Team
            </PrimaryBtn>
            <Modal
              open={detailsModelOpen}
              onClose={() => setDetailsModelOpen(false)}
              aria-labelledby="Member Edit Box"
              aria-describedby="Edit Member Details"
              className="flex z-9999 items-center justify-center h-fit min-h-screen max-sm:overflow-y-auto absolute max-sm:bg-primary-bg border-none! outline-none! focus-visible:outline-none"
              onClick={(e) => {
                e.stopPropagation();
              }}
            >
              <div className="w-full max-w-[28.75em] max-sm:max-w-full max-sm:min-h-screen bg-primary-bg max-h-[90vh] max-sm:max-h-screen overflow-y-auto border-none! outline-none! focus-visible:outline-none rounded-lg">
                <div className="min-h-fit max-sm:max-h-full p-7! max-sm:p-[calc((100vw-var(--max-elements-width))/2)]! rounded-lg max-sm:rounded-none bg-primary-bg flex flex-col max-sm:justify-center gap-5">
                  <div className="w-full flex flex-col">
                    <div className="w-full flex justify-between items-start gap-4">
                      <h2 className="text-2xl font-medium max-xs:text-2xl">
                        Team Details
                      </h2>
                      <button
                        onClick={() => setDetailsModelOpen(false)}
                        className="text-3xl transition-all duration-200 hover:text-red-400 cursor-pointer"
                      >
                        <LuX />
                      </button>
                    </div>
                    <div className="w-full h-px bg-light-black/10 mt-2! mb-7!"></div>
                    <TeamDetails
                      details={userData?.teamSegmentsData?.find(
                        (team) => team.segmentSlug === segmentInfo.segmentSlug,
                      )}
                    />
                  </div>
                </div>
              </div>
            </Modal>
          </div>
        ) : null
      ) : (
        <div className="w-full flex gap-2 mt-2">
          <PrimaryBtn
            isLink={true}
            href={`/${eventSlug}/registration/${segmentInfo.segmentSlug}`}
          >
            Register Now
          </PrimaryBtn>
        </div>
      )}
    </div>
  );
}
