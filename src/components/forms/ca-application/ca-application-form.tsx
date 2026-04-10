import {
  caApplicationSchema,
  type CAApplicationType,
} from "@/lib/validation/ca-form-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import type { Dispatch, ReactNode, SetStateAction } from "react";
import { useForm, type UseFormRegister } from "react-hook-form";
import PrimaryBtn from "../../ui/primary-btn";
import PersonalInfoFields from "./fields/personal-information";
import InstitutionInfoFields from "./fields/institution-information";
import ExperienceInfoFields from "./fields/experience-information";
import ConfirmationFields from "../confirmation";
import type { RegistrationFormType } from "@/lib/validation/register-schema";
import { useMutation } from "@tanstack/react-query";
import { useParams } from "react-router";
import { applyForCA } from "@/lib/api/event";
import { toast } from "react-hot-toast";

export default function CAApplicationForm({
  eventName,
  setApplicationCompleted,
}: {
  eventName: string;
  setApplicationCompleted: Dispatch<SetStateAction<boolean>>;
}): ReactNode {
  const eventSlug = useParams().eventId || "event-slug"; // Replace with actual slug from params
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    setError,
    watch,
  } = useForm({
    resolver: zodResolver(caApplicationSchema),
    defaultValues: {
      hasPreviousExperience: "yes",
    },
  });

  const caApplicationMutation = useMutation({
    mutationFn: async (data: CAApplicationType) => applyForCA(eventSlug, data),
    onSuccess: () => {
      toast.success("Application submitted successfully!");
      setApplicationCompleted(true);
    },
    onError: (error: any) => {
      toast.error(
        error?.response?.data?.message ||
          "An error occurred while submitting your application. Please try again.",
      );
    },
  });

  function onSubmit(data: CAApplicationType) {
    if (data.hasPreviousExperience === "no") {
      data.previousExperienceDetails = "";
    }

    if (
      data.hasPreviousExperience === "yes" &&
      !data.previousExperienceDetails
    ) {
      toast.error("Please provide details about your previous experience.");
      setError("previousExperienceDetails", {
        type: "manual",
        message: "Please provide details about your previous experience.",
      });
      return;
    }
    caApplicationMutation.mutate(data);
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full flex flex-col gap-6 max-sm:gap-10"
    >
      <PersonalInfoFields
        register={register}
        errors={errors}
        setValue={setValue}
      />

      <InstitutionInfoFields
        register={register}
        errors={errors}
        setValue={setValue}
        watch={watch}
      />

      <ExperienceInfoFields
        register={register}
        errors={errors}
        setValue={setValue}
      />

      <ConfirmationFields
        register={
          register as UseFormRegister<RegistrationFormType | CAApplicationType>
        }
        eventName={eventName}
        errors={errors}
      />

      <PrimaryBtn
        type="submit"
        className="px-4! text-lg! max-sm:w-full! max-sm:self-center! max-sm:max-w-[calc(100%-10vw)]! disabled:cursor-not-allowed! disabled:opacity-50! disabled:pointer-events-none!"
        disabled={caApplicationMutation.isPending}
      >
        {caApplicationMutation.isPending
          ? "Submitting..."
          : "Submit Application"}
      </PrimaryBtn>
    </form>
  );
}
