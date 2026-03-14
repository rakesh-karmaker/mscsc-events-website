import FormInfo from "@/components/forms/form-info";
import { useEffect, type ReactNode } from "react";
import RegistrationForm from "@/components/forms/registration-form";
import { useEventData } from "@/hooks/use-event-data";
import { Helmet } from "react-helmet-async";
import FormPageHeader from "@/components/form-page-header";

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

  return (
    <>
      <Helmet>
        <title>{eventMetaData.eventName} - Registration</title>
      </Helmet>
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
          />
        </div>
      </section>
    </>
  );
}
