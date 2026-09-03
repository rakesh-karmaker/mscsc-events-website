import Loader from "@/components/ui/loader";
import { addFreeSoloSegment, getUserData } from "@/lib/api/user";
import type { User } from "@/types/user-data-types";
import { capitalize } from "@mui/material/utils";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState, type ReactNode } from "react";
import { useNavigate, useParams } from "react-router";
import FaFacebook from "~icons/fa/facebook";
import FaPhoneAlt from "~icons/fa/phone";
import FaSchool from "~icons/fa-solid/school";
import IoMdMail from "~icons/ion/md-mail";
import FaClock from "~icons/fa6-regular/clock";
import FaQrcode from "~icons/fa6-solid/qrcode";
import CategoryIcon from "~icons/material-symbols/category";
import FaXmark from "~icons/fa6-solid/xmark";
import getCategory from "@/utils/get-category";
import dayjs from "dayjs";
import { useEventData } from "@/hooks/use-event-data";
import SegmentPreviewCard from "@/components/profile/segment-preview-card";
import PrimaryBtn from "@/components/ui/primary-btn";
import { useUser } from "@/hooks/use-user";
import { toast } from "react-hot-toast";
import type { AxiosError, AxiosResponse } from "axios";
import { Modal } from "@mui/material";

export default function Profile(): ReactNode {
  const eventSlug = useParams().eventSlug || "";
  const token = localStorage.getItem(`${eventSlug}-registrationToken`) || "";
  const { segmentData } = useEventData();
  const navigate = useNavigate();
  const { setUser, user } = useUser();

  const queryClient = useQueryClient();
  const segmentMutation = useMutation({
    mutationFn: (segmentSlug: string) =>
      addFreeSoloSegment(token, eventSlug, segmentSlug),
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
      toast.error(error.response?.data?.message || "Failed to add segment");
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

  const [instructionsOpen, setInstructionsOpen] = useState(
    localStorage.getItem("isNewRegister") === "true" ||
      localStorage.getItem("isNewPaidSegment") === "true",
  );

  useEffect(() => {
    if (instructionsOpen) {
      localStorage.removeItem("isNewRegister");
      localStorage.removeItem("isNewPaidSegment");
    }
  }, [instructionsOpen]);

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

  const availableSegments =
    userData.status != "rejected"
      ? segmentData.filter((segment) => {
          if (
            getCategory(userData.grade) &&
            !userData.segments.includes(segment.segmentSlug)
          ) {
            return segment.category.length > 0
              ? segment.category.includes(getCategory(userData.grade)!)
              : true;
          }
          return false;
        })
      : [];

  return (
    <>
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
                <FaSchool className="text-text text-[0.8rem]" />
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

                    <div
                      className="grid grid-cols-[max-content_max-content] grid-rows-2 gap-1 ml-3"
                      style={{
                        rowGap:
                          userData.status === "validated"
                            ? "0.6rem"
                            : "0.25rem",
                      }}
                    >
                      <p className="flex justify-center">
                        <FaQrcode className="text-text text-base" />{" "}
                      </p>
                      <p className="flex gap-1 flex-wrap items-center text-text text-lg">
                        <span className="leading-4 -mb-0.75">
                          CODE:{" "}
                          {userData.status === "validated" ? (
                            <span className="font-medium px-2 py-1 bg-orange-50 border border-primary/60 rounded-sm">
                              {userData.code}
                            </span>
                          ) : userData.status === "pending" ? (
                            "N/A"
                          ) : (
                            "Rejected"
                          )}
                        </span>
                      </p>

                      <p className="flex justify-center">
                        <FaClock className="text-text text-base" />{" "}
                      </p>
                      <p className="flex gap-1 flex-wrap items-center text-text text-lg">
                        <span className="leading-4 -mb-0.75">
                          {dayjs(userData.registrationDate).format(
                            "MMM D, YYYY",
                          )}
                        </span>
                      </p>
                    </div>
                  </div>

                  <div>
                    <h2 className="text-2xl font-medium text-primary mb-2">
                      Personal Information
                    </h2>
                    <div className="grid grid-cols-[max-content_max-content] grid-rows-3 gap-1 ml-3">
                      <p className="flex justify-center">
                        <FaPhoneAlt className="text-text text-sm" />{" "}
                      </p>
                      <p className="flex gap-1 flex-wrap items-center text-text text-lg">
                        <span className="leading-4 -mb-0.5">
                          {userData.phoneNumber}
                        </span>
                      </p>

                      <p className="flex justify-center">
                        <FaFacebook className="text-text text-base" />{" "}
                      </p>
                      <a
                        href={userData.facebookUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex gap-1 flex-wrap items-center text-text text-lg hover:text-primary transition-colors"
                      >
                        <span className="leading-4 -mb-0.75">
                          Facebook Profile
                        </span>
                      </a>

                      <p className="flex justify-center">
                        <IoMdMail className="text-text text-base" />{" "}
                      </p>
                      <a
                        href={`mailto:${userData.email}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex gap-1 max-sm:flex-wrap items-center text-text text-lg hover:text-primary transition-colors"
                      >
                        <span className="leading-4 -mb-0.75">
                          {userData.email}
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
                        <FaSchool className="text-text text-[0.8rem]" />{" "}
                        <span className="leading-4 -mb-0.75">
                          {userData.institution}
                        </span>
                      </p>
                      <p className="flex gap-1 flex-wrap items-center text-text text-lg">
                        <CategoryIcon className="text-text text-base" />{" "}
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
                          status={
                            userData.paidSoloSegments.find(
                              (ps) =>
                                ps.segmentSlug === segmentInfo.segmentSlug,
                            )?.status
                          }
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
                        {availableSegments.map((segment) => {
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

      <Modal
        open={instructionsOpen}
        onClose={() => setInstructionsOpen(false)}
        aria-labelledby="Member Edit Box"
        aria-describedby="Edit Member Details"
        className="flex items-center justify-center h-fit min-h-screen max-sm:overflow-y-auto absolute  border-none! outline-none! focus-visible:outline-none"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <div className="w-full max-w-[33.75em] max-md:max-w-[28.75em] max-sm:max-w-max-width bg-primary-bg max-h-[90vh] max-sm:max-h-screen overflow-y-auto border-none! outline-none! focus-visible:outline-none rounded-lg">
          <div className="min-h-fit max-sm:max-h-full p-7! max-sm:p-[calc((100vw-var(--max-elements-width))/2)]! rounded-lg max-sm:rounded-none bg-primary-bg flex flex-col max-sm:justify-center gap-5">
            <div className="w-full flex flex-col">
              <div className="w-full flex justify-between items-start gap-4">
                <h2 className="text-2xl font-medium max-xs:text-2xl">
                  Almost done!
                </h2>
                <button
                  onClick={() => setInstructionsOpen(false)}
                  className="text-3xl transition-all duration-200 hover:text-red-400 cursor-pointer"
                >
                  <FaXmark />
                </button>
              </div>
              <div className="w-full h-px bg-light-black/10 mt-2! mb-3.5!"></div>
              <div className="w-full h-full">
                <p className="text-text">
                  We have received your{" "}
                  {localStorage.getItem("isNewRegister") === "true"
                    ? "registration"
                    : "payment"}{" "}
                  and are currently reviewing it. Please note that the review
                  process may take some time, and we appreciate your patience.
                  You will be notified via email once your{" "}
                  {localStorage.getItem("isNewRegister") === "true"
                    ? "registration"
                    : "payment"}{" "}
                  has been approved and your status updated. Thank you for your
                  understanding!
                </p>
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
}
