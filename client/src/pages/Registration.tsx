import websiteData from "@/services/data/websiteData.json";
import FormInfo from "@/components/forms/registrationForm/FormInfo";
import RegistrationHeader from "@/components/RegistrationHeader";
import { useEffect, type ReactNode } from "react";
import RegistrationForm from "@/components/forms/registrationForm/RegistrationForm";

export default function Registration(): ReactNode {
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
          segments={websiteData.segments}
        />
      </div>
    </section>
  );
}
