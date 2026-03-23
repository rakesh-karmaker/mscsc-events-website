import FormInfo from "@/components/forms/form-info";
import { useEffect, type ReactNode } from "react";
import RegistrationForm from "@/components/forms/registration-form/registration-form";
import { useEventData } from "@/hooks/use-event-data";
import { Helmet } from "react-helmet-async";
import FormPageHeader from "@/components/form-page-header";
import PrimaryBtn from "@/components/ui/primary-btn";
import { useParams } from "react-router";

export default function Registration(): ReactNode {
  // Fetch event data using the custom hook
  const { formData, segmentData, eventMetaData } = useEventData();
  if (!formData || !segmentData || !eventMetaData || eventMetaData.isHomepage) {
    throw new Error("Registration data is unavailable");
  }

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);

  const hasDeadlinePassed = formData.registrationDeadline
    ? new Date() > new Date(formData.registrationDeadline)
    : false;

  const eventId = useParams().eventId || "";

  if (
    !hasDeadlinePassed &&
    !eventMetaData.isInnerRegistration &&
    !eventMetaData.hideRegistrationForm &&
    eventMetaData.registrationUrl
  ) {
    // If the registration is not through the website and the deadline hasn't passed, redirect to the external registration URL
    window.location.href = eventMetaData.registrationUrl;
    return null; // Return null to prevent rendering the rest of the component
  }

  return (
    <>
      <Helmet>
        <title>{eventMetaData.eventName} - Registration</title>
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
              <p className="text-lg/snug text-text">
                {eventMetaData.hideRegistrationForm
                  ? "We are currently not accepting registration requests. Please stay tuned for future updates!"
                  : "The registration deadline has passed. Please stay tuned for future events and opportunities!"}
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
            Become a Part of <br /> the Scientific Experience
          </FormPageHeader>
          <div className="w-full flex gap-10 max-w-max-width max-sm:max-w-full mb-20 max-lg:flex-col">
            <FormInfo title={formData.title} details={formData.details} />
            <RegistrationForm
              transactionMethods={formData.transactionMethods}
              fees={formData.fees}
              segments={segmentData}
              eventName={eventMetaData.eventName}
            />
          </div>
        </section>
      )}
    </>
  );
}
