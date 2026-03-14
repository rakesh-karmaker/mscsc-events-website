import FormInfo from "@/components/forms/form-info";
import { useEffect, type ReactNode } from "react";
import { useEventData } from "@/hooks/use-event-data";
import { Helmet } from "react-helmet-async";
import FormPageHeader from "@/components/form-page-header";
import CAApplicationForm from "@/components/forms/ca-application-form";

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

  return (
    <>
      <Helmet>
        <title>{eventMetaData.eventName} - CA Application</title>
      </Helmet>
      <section className="w-full h-full flex flex-col gap-10 max-sm:gap-0 items-center">
        <FormPageHeader>
          Become one of <br /> the Change Agents
        </FormPageHeader>
        <div className="w-full flex gap-10 max-w-max-width max-sm:max-w-full mb-20 max-lg:flex-col">
          <FormInfo title={caFormData.title} details={caFormData.details} />
          <CAApplicationForm />
        </div>
      </section>
    </>
  );
}
