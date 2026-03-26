import FormInfo from "@/components/forms/form-info";
import { useEffect, type ReactNode } from "react";
import { useEventData } from "@/hooks/use-event-data";
import { Helmet } from "react-helmet-async";
import FormPageHeader from "@/components/form-page-header";
import CAApplicationForm from "@/components/forms/ca-application/ca-application-form";
import PrimaryBtn from "@/components/ui/primary-btn";
import { useParams } from "react-router";

export default function CAApplication(): ReactNode {
  // Fetch event data using the custom hook
  const { caFormData, eventMetaData } = useEventData();
  if (
    !eventMetaData ||
    !eventMetaData.hasCAForm ||
    !caFormData ||
    eventMetaData.isHomepage
  ) {
    throw new Error("Application data is unavailable");
  }

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);

  const hasDeadlinePassed = caFormData.applicationDeadline
    ? new Date() > new Date(caFormData.applicationDeadline)
    : false;

  const eventId = useParams().eventId || "";

  return (
    <>
      <Helmet>
        <title>{eventMetaData.eventName} - CA Application</title>
      </Helmet>
      {/* {hasDeadlinePassed || eventMetaData.hideCAForm ? ( */}
      {hasDeadlinePassed ? (
        <div className="w-full h-full min-h-[calc(100vh-var(--nav-height))] flex justify-center items-center p-10 max-sm:max-w-max-width max-sm:mx-auto max-sm:px-0">
          <div className="bg-secondary-bg rounded-lg shadow-lg p-8 text-center max-w-md border-2 border-primary flex flex-col gap-7 items-center max-sm:p-6">
            <div>
              <h2 className="text-3xl font-bold mb-4 text-primary">
                {eventMetaData.hideCAForm
                  ? "Application Unavailable"
                  : "Application Closed"}
              </h2>
              <p className="text-lg/snug text-text">
                {eventMetaData.hideCAForm
                  ? "We are currently not accepting CA applications. Please stay tuned for future updates!"
                  : "The application deadline has passed. Please stay tuned for future events and opportunities!"}
              </p>
            </div>
            <PrimaryBtn
              isLink={true}
              href={`/${eventId}/hero`}
              className="text-lg max-sm:text-base z-999"
            >
              Go to Homepage
            </PrimaryBtn>
          </div>
        </div>
      ) : (
        <section className="w-full h-full flex flex-col gap-10 max-sm:gap-0 items-center">
          <FormPageHeader>
            Become one of <br /> the Campus Ambassadors
          </FormPageHeader>
          <div className="w-full flex gap-10 max-w-max-width max-sm:max-w-full mb-20 max-lg:flex-col">
            <FormInfo title={caFormData.title} details={caFormData.details} />
            <CAApplicationForm eventName={eventMetaData.eventName} />
          </div>
        </section>
      )}
    </>
  );
}
