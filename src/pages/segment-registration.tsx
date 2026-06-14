import FormInfo from "@/components/forms/form-info";
import { useEffect, type ReactNode } from "react";
import { useEventData } from "@/hooks/use-event-data";
import { Helmet } from "react-helmet-async";
import FormPageHeader from "@/components/form-page-header";
import PrimaryBtn from "@/components/ui/primary-btn";
import { useParams } from "react-router";
import { useUser } from "@/hooks/use-user";
import { deSlugify } from "@/utils/de-slugify";
import SegmentRegistrationForm from "@/components/forms/segment-registration-form";

export default function SegmentRegistration(): ReactNode {
  // Fetch event data using the custom hook
  const { formData, segmentData, eventMetaData } = useEventData();
  if (!formData || !segmentData || !eventMetaData || eventMetaData.isHomepage) {
    throw new Error("Registration data is unavailable");
  }

  const { user } = useUser();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);

  const hasDeadlinePassed = formData.registrationDeadline
    ? new Date() > new Date(formData.registrationDeadline)
    : false;

  const eventSlug = useParams().eventSlug || "";
  const segmentSlug = useParams().segmentSlug || "";

  if (
    !hasDeadlinePassed &&
    !eventMetaData.isInnerRegistration &&
    !eventMetaData.hideRegistrationForm &&
    eventMetaData.registrationUrl
  ) {
    return (
      <div className="w-full h-full min-h-[calc(100vh-var(--nav-height))] flex justify-center items-center p-10 max-sm:max-w-max-width max-sm:mx-auto max-sm:px-0">
        <div className="bg-secondary-bg rounded-lg shadow-lg p-8 text-center max-w-md border-2 border-primary flex flex-col gap-7 items-center max-sm:p-6">
          <div>
            <h2 className="text-3xl font-bold mb-4 text-primary">
              Registration Unavailable
            </h2>
            <p className="text-lg/snug max-xl:text-base text-text">
              Website registration for this segment is currently unavailable.
              Please register through the official registration link provided by
              the event organizers. We look forward to your participation in the
              event!
            </p>
          </div>
          <PrimaryBtn
            isLink={true}
            href={`/${eventSlug}/home`}
            className="text-lg max-sm:text-base z-999"
          >
            Go to Homepage
          </PrimaryBtn>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="w-full h-full min-h-[calc(100vh-var(--nav-height))] flex justify-center items-center p-10 max-sm:max-w-max-width max-sm:mx-auto max-sm:px-0">
        <div className="bg-secondary-bg rounded-lg shadow-lg p-8 text-center max-w-md border-2 border-primary flex flex-col gap-7 items-center max-sm:p-6">
          <div>
            <h2 className="text-3xl font-bold mb-4 text-primary">
              Registration Required
            </h2>
            <p className="text-lg/snug max-xl:text-base text-text">
              Please register for the event to access the registration form. If
              you have already registered, please log in with the email you used
              for registration to complete your segment registration. We look
              forward to your participation in the event!
            </p>
          </div>
          <PrimaryBtn
            isLink={true}
            href={`/${eventSlug}/registration`}
            className="text-lg max-sm:text-base z-999"
          >
            Register
          </PrimaryBtn>
        </div>
      </div>
    );
  }

  if (user.segments.includes(segmentSlug)) {
    return (
      <div className="w-full h-full min-h-[calc(100vh-var(--nav-height))] flex justify-center items-center p-10 max-sm:max-w-max-width max-sm:mx-auto max-sm:px-0">
        <div className="bg-secondary-bg rounded-lg shadow-lg p-8 text-center max-w-md border-2 border-primary flex flex-col gap-7 items-center max-sm:p-6">
          <div>
            <h2 className="text-3xl font-bold mb-4 text-primary">
              Registration Completed
            </h2>
            <p className="text-lg/snug max-xl:text-base text-text">
              Our records indicate that you have already registered for this
              segment. If you have any questions about your registration status,
              please contact our support team for assistance. We look forward to
              your participation in the event!
            </p>
          </div>
          <PrimaryBtn
            isLink={true}
            href={`/${eventSlug}/profile`}
            className="text-lg max-sm:text-base z-999"
          >
            Profile Page
          </PrimaryBtn>
        </div>
      </div>
    );
  }

  const segmentInfo = segmentData.find((s) => s.segmentSlug === segmentSlug);
  if (!segmentInfo) {
    throw new Error("Segment data not found");
  }

  return (
    <>
      <Helmet>
        <title>
          {eventMetaData.eventName} - {deSlugify(segmentSlug)}
        </title>
      </Helmet>
      {hasDeadlinePassed || eventMetaData.hideRegistrationForm ? (
        <div className="w-full h-full min-h-[calc(100vh-var(--nav-height))] flex justify-center items-center p-10 max-sm:max-w-max-width max-sm:mx-auto max-sm:px-0">
          <div className="bg-secondary-bg rounded-lg shadow-lg p-8 text-center max-w-md border-2 border-primary flex flex-col gap-7 items-center max-sm:p-6">
            <div>
              <h2 className="text-3xl font-bold mb-4 text-primary">
                {eventMetaData.hideRegistrationForm
                  ? "Registration Unavailable"
                  : "Registration Closed"}
              </h2>
              <p className="text-lg/snug max-xl:text-base text-text">
                {eventMetaData.hideRegistrationForm
                  ? "We are currently not accepting registration requests. Please stay tuned for future updates!"
                  : "The registration deadline has passed. Please stay tuned for future events and opportunities!"}
              </p>
            </div>
            <PrimaryBtn
              isLink={true}
              href={`/${eventSlug}/home`}
              className="text-lg max-sm:text-base z-999"
            >
              Go to Homepage
            </PrimaryBtn>
          </div>
        </div>
      ) : (
        <section className="w-full h-full flex flex-col gap-10 max-sm:gap-0 items-center">
          <FormPageHeader>
            Become a Part of <br /> the Scientific Experience
          </FormPageHeader>
          <div className="w-full flex gap-10 max-w-max-width max-sm:max-w-full mb-20 max-lg:flex-col">
            <FormInfo
              title={`${segmentInfo.title} Segment Registration`}
              details={segmentInfo.details + segmentInfo.rules}
              page={
                segmentInfo.teamType === "team"
                  ? "team-registration"
                  : "segment-registration"
              }
            />
            <SegmentRegistrationForm segmentInfo={segmentInfo} />
          </div>
        </section>
      )}
    </>
  );
}
