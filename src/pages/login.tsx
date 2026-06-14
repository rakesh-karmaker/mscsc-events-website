import FormInfo from "@/components/forms/form-info";
import { useEffect, type ReactNode } from "react";
import { useEventData } from "@/hooks/use-event-data";
import { Helmet } from "react-helmet-async";
import PrimaryBtn from "@/components/ui/primary-btn";
import { useNavigate, useParams } from "react-router";
import { useUser } from "@/hooks/use-user";
import LoginForm from "@/components/forms/login-form";

export default function Login(): ReactNode {
  // Fetch event data using the custom hook
  const { formData, segmentData, eventMetaData } = useEventData();
  if (!formData || !segmentData || !eventMetaData || eventMetaData.isHomepage) {
    throw new Error("Login data is unavailable");
  }

  const { user } = useUser();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);

  const eventSlug = useParams().eventSlug || "";
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      // If user is already logged in, redirect to profile page
      navigate(`/${eventSlug}/profile`);
    }
  }, [user, navigate, eventSlug]);

  if (
    !eventMetaData.isInnerRegistration &&
    !eventMetaData.hideRegistrationForm &&
    eventMetaData.registrationUrl
  ) {
    return (
      <div className="w-full h-full min-h-[calc(100vh-var(--nav-height))] flex justify-center items-center p-10 max-sm:max-w-max-width max-sm:mx-auto max-sm:px-0">
        <div className="bg-secondary-bg rounded-lg shadow-lg p-8 text-center max-w-md border-2 border-primary flex flex-col gap-7 items-center max-sm:p-6">
          <div>
            <h2 className="text-3xl font-bold mb-4 text-primary">
              Login Unavailable
            </h2>
            <p className="text-lg/snug max-xl:text-base text-text">
              This event uses an external registration system, so login through
              the website is unavailable. Please click the button below to go to
              the event homepage and access the external registration/login
              system.
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
    ); // Return null to prevent rendering the rest of the component
  }

  return (
    <>
      <Helmet>
        <title>{eventMetaData.eventName} - Login</title>
      </Helmet>

      <section className="w-full h-fit min-h-screen py-10 pb-20 flex flex-col justify-center gap-10 max-sm:gap-0 items-center">
        <div className="w-full flex flex-col gap-7 max-w-148 max-md:max-w-full max-lg:flex-col">
          <FormInfo
            title={"Welcome Back to " + eventMetaData.eventName}
            details={
              "Please enter your email and password to access your account and manage your event participation. We are excited to have you back and look forward to seeing you at the event!"
            }
            page="login"
          />
          <LoginForm />
        </div>
      </section>
    </>
  );
}
