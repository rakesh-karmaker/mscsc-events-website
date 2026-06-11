import Loader from "@/components/ui/loader";
import { getUserData } from "@/lib/api/user";
import type { User } from "@/types/user-data-types";
import { capitalize } from "@mui/material/utils";
import { useQuery } from "@tanstack/react-query";
import { type ReactNode } from "react";
import { useParams } from "react-router";
import { IoMdMail } from "react-icons/io";
import {
  FaClock,
  FaFacebook,
  FaPhone,
  FaQrcode,
  FaSchool,
} from "react-icons/fa6";
import getCategory from "@/utils/get-category";
import { MdCategory } from "react-icons/md";
import dayjs from "dayjs";
import { useEventData } from "@/hooks/use-event-data";
import SegmentPreviewCard from "@/components/profile/segment-preview-card";

export default function Profile(): ReactNode {
  const eventSlug = useParams().eventSlug || "";
  const token = localStorage.getItem(`${eventSlug}-registrationToken`) || "";
  const { segmentData } = useEventData();

  const { data, isLoading, error } = useQuery({
    queryKey: ["userData"],
    queryFn: () => {
      if (token) {
        return getUserData(token, eventSlug).then((res) => res.data);
      } else {
        throw new Error("No registration token found");
      }
    },
  });

  if (isLoading || !data || !segmentData) {
    return (
      <div className="w-full h-full min-h-screen flex justify-center items-center">
        <Loader />
      </div>
    );
  }

  if (error) {
    console.error("Error fetching user data:", error);
    throw new Error("Failed to fetch user data");
  }

  const userData = data.userData as User;

  function getStatusTag(
    status: "pending" | "validated" | "rejected",
  ): ReactNode {
    let colorClasses = "";
    switch (status) {
      case "pending":
        colorClasses = "bg-yellow-100 text-yellow-800";
        break;
      case "validated":
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
        className={`text-base py-1! px-2! rounded ${colorClasses} inline-block`}
      >
        {capitalize(status)}
      </span>
    );
  }

  return (
    <section className="w-full h-full flex flex-col relative">
      <div className="w-full h-full flex justify-center items-center relative before:absolute before:inset-0 before:bg-linear-to-r before:from-primary-bg before:via-50% before:via-transparent before:to-primary-bg before:opacity-100">
        <img
          width="500px"
          height="300px"
          src={data.bannerUrl}
          alt="Event Banner"
          className="w-full h-auto max-w-[calc(var(--max-width)+4rem)] aspect-30/7 object-cover object-center rounded-bl-md rounded-br-md"
        />
      </div>
      <div className="w-full h-full mx-auto flex flex-col gap-10">
        <div className="w-full flex gap-5 items-end max-w-max-width mx-auto">
          <div className="w-70 min-w-70 max-w-70 h-70 min-h-70 max-h-70 p-4 bg-primary/5 backdrop-blur-sm flex justify-center items-center rounded-[20%] -mt-20">
            <img
              src={userData.photoUrl}
              alt="Profile Image"
              className="w-full h-full object-cover rounded-[20%]"
            />
          </div>
          <div className="flex flex-col mt-2 mb-2">
            <div className="flex gap-2 items-center">
              <h1 className="text-5xl font-medium text-primary">
                {userData.name}
              </h1>{" "}
              {getStatusTag(userData.status)}
            </div>
            <div className="flex gap-1 w-fit items-center">
              <IoMdMail className="text-text" />
              <p className="text-base text-text">{userData.email}</p>
            </div>
            <div className="flex gap-1 w-fit items-center">
              <FaSchool className="text-text" />
              <p className="text-base text-text">{userData.institution}</p>
            </div>
            {userData.status === "rejected" && userData.rejectionReason && (
              <div className="w-full bg-red-50 border border-red-200 text-red-800 text-sm p-3! rounded mt-2!">
                <h4 className="font-medium mb-1!">Rejection Reason:</h4>
                <p>{userData.rejectionReason}</p>
              </div>
            )}
          </div>
        </div>

        <div className="w-full h-full border-t-2 border-primary pb-10 max-w-[calc(var(--max-width)+4rem)] mx-auto">
          <div className="w-full h-full max-w-max-width mx-auto flex gap-10">
            <div className="w-fit h-auto border-r-2 border-primary py-5 flex flex-col gap-5 pr-30 relative">
              <div className="w-full h-fit sticky top-20 flex flex-col gap-7">
                <div>
                  <h2 className="text-2xl font-medium text-primary mb-2">
                    Registration Information
                  </h2>
                  <div className="flex flex-col gap-3 ml-3">
                    <p className="flex gap-1 items-center text-text text-lg">
                      <FaQrcode className="text-text text-base" />{" "}
                      <span className="leading-4 -mb-0.75">
                        CODE:{" "}
                        {userData.status === "validated"
                          ? userData.code
                          : userData.status === "pending"
                            ? "N/A"
                            : "Rejected"}
                      </span>
                    </p>
                    <p className="flex gap-1 items-center text-text text-lg">
                      <FaClock className="text-text text-base" />{" "}
                      <span className="leading-4 -mb-0.75">
                        {dayjs(userData.registrationDate).format("MMM D, YYYY")}
                      </span>
                    </p>
                  </div>
                </div>

                <div>
                  <h2 className="text-2xl font-medium text-primary mb-2">
                    Personal Information
                  </h2>
                  <div className="flex flex-col gap-3 ml-3">
                    <p className="flex gap-1 items-center text-text text-lg">
                      <FaPhone className="text-text text-sm" />{" "}
                      <span className="leading-4 -mb-0.5">
                        {userData.phoneNumber}
                      </span>
                    </p>
                    <a
                      href={`mailto:${userData.email}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex gap-1 items-center text-text text-lg hover:text-primary transition-colors"
                    >
                      <IoMdMail className="text-text text-base" />{" "}
                      <span className="leading-4 -mb-0.75">
                        {userData.email}
                      </span>
                    </a>
                    <a
                      href={userData.facebookUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex gap-1 items-center text-text text-lg hover:text-primary transition-colors"
                    >
                      <FaFacebook className="text-text text-base" />{" "}
                      <span className="leading-4 -mb-0.75">
                        Facebook Profile
                      </span>
                    </a>
                  </div>
                </div>

                <div>
                  <h2 className="text-2xl font-medium text-primary mb-2">
                    Institution Information
                  </h2>
                  <div className="flex flex-col gap-3 ml-3">
                    <p className="flex gap-1 items-center text-text text-lg">
                      <FaSchool className="text-text text-base" />{" "}
                      <span className="leading-4 -mb-0.75">
                        {userData.institution}
                      </span>
                    </p>
                    <p className="flex gap-1 items-center text-text text-lg">
                      <MdCategory className="text-text text-base" />{" "}
                      <span className="leading-4 -mb-0.75">
                        {getCategory(userData.grade)} Category
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="w-full h-full border-primary py-5 flex flex-col gap-9">
              <div>
                <h2 className="text-2xl font-medium text-primary mb-2">
                  Your Registered Segments
                </h2>
                <div className="w-full h-full grid grid-cols-3 gap-4">
                  {userData.segments.map((s) => {
                    const segmentInfo = segmentData.find(
                      (segment) => segment.segmentSlug === s,
                    );

                    if (!segmentInfo) {
                      return null;
                    }
                    return (
                      <SegmentPreviewCard
                        key={segmentInfo.segmentSlug}
                        segmentInfo={segmentInfo}
                        eventSlug={eventSlug}
                        isRegistered={true}
                      />
                    );
                  })}
                </div>
              </div>

              {/* Not registered section */}
              <div>
                {" "}
                <h2 className="text-2xl font-medium text-primary mb-2">
                  Check Out Other Segments
                </h2>
                <div className="w-full h-full grid grid-cols-3 gap-4">
                  {segmentData.map((segment) => {
                    if (userData.segments.includes(segment.segmentSlug)) {
                      return null;
                    }

                    return (
                      <SegmentPreviewCard
                        key={segment.segmentSlug}
                        segmentInfo={segment}
                        eventSlug={eventSlug}
                        isRegistered={false}
                      />
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
