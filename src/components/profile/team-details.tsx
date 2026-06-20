import type { TeamSegmentData } from "@/types/user-data-types";
import capitalize from "@/utils/capitalize";
import { deSlugify } from "@/utils/de-slugify";
import type { ReactNode } from "react";

export default function TeamDetails({
  details,
}: {
  details: TeamSegmentData | undefined;
}): ReactNode {
  if (!details) {
    return (
      <div className="w-full h-full flex justify-center items-center">
        <p className="text-gray-500">No team details available.</p>
      </div>
    );
  }

  function getStatusTag(
    status: "pending" | "approved" | "rejected",
  ): ReactNode {
    let colorClasses = "";
    switch (status) {
      case "pending":
        colorClasses = "bg-yellow-100 text-yellow-800";
        break;
      case "approved":
        colorClasses = "bg-green-100 text-green-800";
        break;
      case "rejected":
        colorClasses = "bg-red-100 text-red-800";
        break;
      default:
        colorClasses = "bg-gray-100 text-gray-800";
    }
    return (
      <span
        className={`text-sm py-1! px-2! rounded ${colorClasses} inline-block`}
      >
        {capitalize(status)}
      </span>
    );
  }

  return (
    <div className="w-full h-full flex flex-col gap-3">
      <div>
        <h3 className="text-3xl text-primary">{details.teamName}</h3>
        <p className="text-base mb-0.5! text-gray-600">
          {deSlugify(details.segmentSlug, false)}
        </p>
        <div className="w-full h-full flex flex-wrap gap-1">
          {getStatusTag(details.status)}
        </div>
      </div>
      <div className="flex flex-col gap-1"></div>

      <div>
        <h3 className="text-xl mb-1!">Team Leader:</h3>
        <div className="flex flex-col gap-1"></div>

        <div className="w-full text-[0.97rem] flex gap-1 text-gray-700 ml-2">
          <span className="min-w-fit">Email: </span>
          <span className="font-medium text-text">{details.leaderEmail}</span>
        </div>
      </div>

      <div className="mt-2!">
        <h3 className="text-xl mb-1!">Team Members:</h3>
        <div className="flex flex-col gap-1"></div>
        {details.memberEmails.length > 0 ? (
          <div className="flex flex-col gap-2 ml-2">
            {details.memberEmails.map((memberEmail: string, index: number) => {
              return (
                <div
                  key={index}
                  className="w-full text-[0.97rem] flex gap-1 text-gray-700"
                >
                  <span className="min-w-fit">Email: </span>
                  <span className="font-medium text-text">{memberEmail}</span>
                </div>
              );
            })}
          </div>
        ) : (
          <p className="text-gray-500 ml-2">No members added to the team.</p>
        )}
      </div>
    </div>
  );
}
