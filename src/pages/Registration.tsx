import websiteData from "@/services/data/website-data.json";
import FormInfo from "@/components/forms/registration-form/form-info";
import RegistrationHeader from "@/components/registration-header";
import { useEffect, type ReactNode } from "react";
import RegistrationForm from "@/components/forms/registration-form/registration-form";
import { useEventData } from "@/hooks/useEventData";

export default function Registration(): ReactNode {
  // Fetch event data using the custom hook
  const { formData, segmentData } = useEventData();
  if (!formData || !segmentData) {
    throw new Error("Registration data is unavailable");
  }

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);

  return (
    <section className="w-full h-full flex flex-col gap-10 items-center">
      <RegistrationHeader />
      <div className="w-full flex gap-10 max-w-max-width mb-20 max-lg:flex-col">
        <FormInfo
          title={websiteData.formData.title}
          details={websiteData.formData.details}
        />
        <RegistrationForm
          transactionMethods={websiteData.formData.transactionMethods}
          fees={websiteData.formData.fees}
          segments={segmentData}
        />
      </div>
    </section>
  );
}
