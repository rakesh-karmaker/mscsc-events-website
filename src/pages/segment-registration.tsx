import FormInfo from "@/components/forms/form-info";
import { useEffect, useState, type ReactNode } from "react";
import RegistrationForm from "@/components/forms/registration-form/registration-form";
import { useEventData } from "@/hooks/use-event-data";
import { Helmet } from "react-helmet-async";
import FormPageHeader from "@/components/form-page-header";
import PrimaryBtn from "@/components/ui/primary-btn";
import { useParams } from "react-router";
import type {
  EventMetaDataType,
  ExplorionSegmentType,
} from "@/types/event-data-types";

export default function SegmentRegistration(): ReactNode {
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

  const eventSlug = useParams().eventSlug || "";
  const [hasRegistered, setHasRegistered] = useState(false);
  const [teamSegmentsData, _] = useState<{
    [segmentSlug: string]: {
      teamName: string;
      leaderEmail: string;
      memberEmails: string[];
    };
  } | null>(null);

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

  if (hasRegistered) {
    return (
      <>
        <Helmet>
          <title>{eventMetaData.eventName} - Registration</title>
        </Helmet>
        <RegistrationCompleteCard
          eventMetaData={eventMetaData}
          teamSegmentsData={teamSegmentsData}
          segmentData={segmentData}
          eventSlug={eventSlug}
        />
      </>
    );
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
            <FormInfo title={formData.title} details={formData.details} />
            <RegistrationForm
              transactionMethods={formData.transactionMethods}
              fees={formData.fees}
              segments={segmentData}
              eventName={eventMetaData.eventName}
              setHasRegistered={setHasRegistered}
              // setTeamSegmentsData={setTeamSegmentsData}
            />
          </div>
        </section>
      )}
    </>
  );
}

function RegistrationCompleteCard({
  eventMetaData,
  teamSegmentsData,
  segmentData,
  eventSlug,
}: {
  eventMetaData: EventMetaDataType;
  teamSegmentsData: {
    [segmentSlug: string]: {
      teamName: string;
      leaderEmail: string;
      memberEmails: string[];
    };
  } | null;
  segmentData: ExplorionSegmentType[];
  eventSlug: string;
}): ReactNode {
  return (
    <div className="w-full h-full min-h-[calc(100vh-var(--nav-height))] flex justify-center items-center p-10 max-sm:max-w-max-width max-sm:mx-auto max-sm:px-0">
      <div className="bg-secondary-bg rounded-lg shadow-lg p-8 text-center max-w-md border-2 border-primary flex flex-col gap-7 items-center max-sm:p-6">
        <div>
          <h2 className="text-3xl font-bold mb-4 text-primary">
            Registration Successful
          </h2>
          <p className="text-base/snug text-text">
            Thank you for registering for {eventMetaData.eventName}! We have
            received your registration details. We will notify you about
            important updates and information regarding the event via email.
            Stay tuned for an exciting experience ahead!
          </p>
          {teamSegmentsData && Object.keys(teamSegmentsData).length > 0 && (
            <div className="mt-4 text-left text-text">
              <h3 className="text-xl font-semibold mb-2 text-primary">
                Your Team Information:
              </h3>
              {Object.entries(teamSegmentsData).map(
                ([segmentSlug, teamData]) => (
                  <div key={segmentSlug} className="mt-2">
                    <h4 className="text-lg font-medium text-secondary">
                      Segment:{" "}
                      {segmentData.find((s) => s.segmentSlug === segmentSlug)
                        ?.title || segmentSlug}
                    </h4>
                    <p>
                      <strong className="font-medium">Team Name:</strong>{" "}
                      {teamData.teamName}
                    </p>
                    <p>
                      <strong className="font-medium">
                        Team Leader Email:
                      </strong>{" "}
                      {teamData.leaderEmail}
                    </p>
                    {teamData.memberEmails.length > 0 && (
                      <div>
                        <strong className="font-medium">Team Members:</strong>
                        <ul className="list-disc list-inside ml-3">
                          {teamData.memberEmails.map((email, index) => (
                            <li key={index}>{email}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                ),
              )}
              <p className="mt-3 text-[1.01rem]/[120%] text-text italic">
                After your other team members have registered, you will receive
                a team confirmation email shortly.
              </p>
            </div>
          )}
        </div>
        <PrimaryBtn
          isLink={true}
          href={`/${eventSlug}/hero`}
          className="text-lg max-sm:text-base z-999"
        >
          Go to Homepage
        </PrimaryBtn>
      </div>
    </div>
  );
}
