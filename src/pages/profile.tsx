import Loader from "@/components/ui/loader";
import { addFreeSoloSegment, getUserData } from "@/lib/api/user";
import type { User } from "@/types/user-data-types";
import { capitalize } from "@mui/material/utils";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { type ReactNode } from "react";
import { useNavigate, useParams } from "react-router";
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
import PrimaryBtn from "@/components/ui/primary-btn";
import { useUser } from "@/hooks/use-user";
import { toast } from "react-hot-toast";
import type { AxiosError, AxiosResponse } from "axios";

export default function Profile(): ReactNode {
  const eventSlug = useParams().eventSlug || "";
  const token = localStorage.getItem(`${eventSlug}-registrationToken`) || "";
  const { segmentData } = useEventData();
  const navigate = useNavigate();
  const { setUser, user } = useUser();

  const queryClient = useQueryClient();
  const segmentMutation = useMutation({
    mutationFn: (segmentSlug: string) =>
      addFreeSoloSegment(
        localStorage.getItem(token) || "",
        eventSlug,
        segmentSlug,
      ),
    onSuccess: (res: AxiosResponse<{ segments?: string[] }>) => {
      queryClient.invalidateQueries({ queryKey: ["userData"] });
      toast.success("Segment added successfully!");

      if (!user) return;

      const { segments, ...rest } = user;
      const updatedUser = {
        ...rest,
        segments: res.data?.segments || segments,
      } as User;
      setUser(updatedUser);
    },
    onError: (error: AxiosError<{ message?: string }>) => {
      console.error("Error adding free solo segment:", error);
      toast.error("Failed to add segment. Please try again.");
    },
  });

  const { data, isLoading, error } = useQuery({
    queryKey: ["userData"],
    queryFn: async () => {
      if (token) {
        return getUserData(token, eventSlug).then((res) => res.data);
      } else {
        throw new Error("No registration token found");
      }
    },
  });
  const userData = data?.userData as User;

  if (error || !token) {
    console.error("Error fetching user data:", error);
    throw new Error("Failed to fetch user data");
  }

  if (isLoading || !data || !segmentData) {
    return (
      <div className="w-full h-full min-h-screen flex justify-center items-center">
        <Loader />
      </div>
    );
  }

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
          className="w-full h-auto min-h-44 max-w-[calc(var(--max-width)+4rem)] aspect-30/7 object-cover object-center rounded-bl-md rounded-br-md"
        />
      </div>
      <div className="w-full h-full mx-auto flex flex-col gap-10">
        <div className="w-full flex max-sm:flex-col gap-5 max-md:gap-2 items-end max-md:items-start max-w-max-width mx-auto">
          <div className="w-70 max-lg:w-55 max-md:w-45 min-w-70 max-lg:min-w-55 max-md:min-w-45 max-w-70 max-lg:max-w-55 max-md:max-w-45 h-70 max-lg:h-55 max-md:h-45 min-h-70 max-lg:min-h-55 max-md:min-h-45 max-h-70 max-lg:max-h-55 max-md:max-h-45 p-4 max-xl:p-3 bg-primary/5 backdrop-blur-sm flex justify-center items-center rounded-[20%] -mt-20 max-md:-mt-10">
            <img
              src={userData.photoUrl}
              alt="Profile Image"
              className="w-full h-full object-cover rounded-[20%]"
            />
          </div>
          <div className="flex flex-col mt-2 max-lg:mt-5 mb-2">
            <div className="flex gap-2 items-center">
              <h1 className="text-5xl max-lg:text-4xl max-md:3xl font-medium text-primary">
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
            <div className="mt-2">
              <PrimaryBtn
                onClick={() => {
                  localStorage.removeItem(`${eventSlug}-registrationToken`);
                  setUser(null);
                  navigate(`/${eventSlug}/home`);
                }}
                className="py-1.5!"
              >
                Sign Out
              </PrimaryBtn>
            </div>
          </div>
        </div>

        <div className="w-full h-full border-t-2 border-primary pb-10 max-w-[calc(var(--max-width)+4rem)] mx-auto">
          <div className="w-full h-full max-w-max-width max-md:max-w-full mx-auto flex gap-10 max-md:flex-col">
            <div className="w-fit max-md:w-full h-auto border-r-2 max-md:border-r-0 max-md:border-b-2 border-primary py-5 flex flex-col gap-5 pr-30 max-xl:pr-5 max-md:pr-0 relative">
              <div className="profile-left w-full h-fit sticky top-20 flex max-md:max-w-max-width max-md:mx-auto flex-col gap-7">
                <div>
                  <h2 className="text-2xl font-medium text-primary mb-2 min-w-[17ch] max-xs:min-w-0">
                    Registration Information
                  </h2>
                  <div className="flex flex-col gap-3 ml-3">
                    <p className="flex gap-1 flex-wrap items-center text-text text-lg">
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
                    <p className="flex gap-1 flex-wrap items-center text-text text-lg">
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
                    <p className="flex gap-1 flex-wrap items-center text-text text-lg">
                      <FaPhone className="text-text text-sm" />{" "}
                      <span className="leading-4 -mb-0.5">
                        {userData.phoneNumber}
                      </span>
                    </p>
                    <a
                      href={`mailto:${userData.email}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex gap-1 max-sm:flex-wrap items-center text-text text-lg hover:text-primary transition-colors"
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
                      className="flex gap-1 flex-wrap items-center text-text text-lg hover:text-primary transition-colors"
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
                    <p className="flex gap-1 flex-wrap items-center text-text text-lg">
                      <FaSchool className="text-text text-base" />{" "}
                      <span className="leading-4 -mb-0.75">
                        {userData.institution}
                      </span>
                    </p>
                    <p className="flex gap-1 flex-wrap items-center text-text text-lg">
                      <MdCategory className="text-text text-base" />{" "}
                      <span className="leading-4 -mb-0.75">
                        {getCategory(userData.grade)} Category
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="w-full h-full border-primary py-5 flex flex-col gap-9 max-md:max-w-max-width max-md:mx-auto">
              <div>
                <h2 className="text-2xl font-medium text-primary mb-2">
                  Your Registered Segments
                </h2>
                <div className="w-full h-full grid grid-cols-3 max-xl:grid-cols-2 max-900:grid-cols-1 max-md:grid-cols-2 max-sm:grid-cols-1 gap-4">
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
                        userData={userData}
                        eventSlug={eventSlug}
                        isRegistered={true}
                      />
                    );
                  })}
                </div>
              </div>

              {/* Not registered section */}
              {userData.status != "rejected" && (
                <>
                  <div>
                    <h2 className="text-2xl font-medium text-primary mb-2">
                      Check Out Other Segments
                    </h2>
                    <div className="w-full h-full grid grid-cols-3 max-xl:grid-cols-2 max-900:grid-cols-1 max-md:grid-cols-2 max-sm:grid-cols-1 gap-4">
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
                            onClick={(segmentSlug) =>
                              segmentMutation.mutate(segmentSlug)
                            }
                            isPending={segmentMutation.isPending}
                          />
                        );
                      })}
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
