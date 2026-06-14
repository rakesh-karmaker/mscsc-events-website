import PrimaryBtn from "@/components/ui/primary-btn";
import { registerForEvent } from "@/lib/api/event";
import {
  registrationFormSchema,
  type RegistrationFormType,
} from "@/lib/validation/register-schema";
import type { SegmentType } from "@/types/global-types";
import getCategory from "@/utils/get-category";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useEffect, useState, type ReactNode } from "react";
import { useForm, type UseFormRegister } from "react-hook-form";
import toast from "react-hot-toast";
import { useParams, useSearchParams } from "react-router";
import PersonalInfoFields from "./fields/personal-information";
import InstitutionInfoFields from "./fields/institution-information";
import ReferenceInformationFields from "./fields/reference-information";
import PaymentInformationFields from "./fields/payment-information";
import ConfirmationFields from "../confirmation";
import SegmentSelectionFields from "./fields/segment-selection";
import type { CAApplicationType } from "@/lib/validation/ca-form-schema";
import type { AxiosError, AxiosResponse } from "axios";
import type { UserDataPreviewType } from "@/types/user-data-types";
import { useUser } from "@/hooks/use-user";

type RegistrationFormProps = {
  transactionMethods: {
    [platform: string]: {
      number: string;
      qrCodeUrl?: string;
      qrCodePublicId?: string;
    };
  };
  fees: number;
  segments: SegmentType[];
  eventName: string;
};

export default function RegistrationForm({
  transactionMethods,
  fees,
  segments,
  eventName,
}: RegistrationFormProps): ReactNode {
  const eventSlug = useParams().eventSlug || "event-slug"; // Replace with actual slug from params
  const { setUser } = useUser();

  const [searchParams] = useSearchParams();
  const [selectedSegments, setSelectedSegments] = useState<string[]>([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    setError,
    watch,
  } = useForm({
    resolver: zodResolver(registrationFormSchema),
    defaultValues: {
      segments: [],
      transactionMethod: transactionMethods
        ? Object.keys(transactionMethods)[0]
        : "",
      clubReference: searchParams.get("club-ref") || "",
      grade: "select",
    },
  });
  const gradeValue = watch("grade", "select");

  useEffect(() => {
    if (!gradeValue || gradeValue === "select") return;
    setValue("category", getCategory(gradeValue));
  }, [gradeValue]);

  const registrationMutation = useMutation({
    mutationFn: (data: RegistrationFormType) =>
      registerForEvent(eventSlug, data),
    onSuccess: (
      res: AxiosResponse<{
        message: string;
        token: string;
        registrationData: UserDataPreviewType;
      }>,
    ) => {
      toast.success("Registration successful!");
      localStorage.setItem(`${eventSlug}-registrationToken`, res.data.token);
      setUser(res.data.registrationData || null);
      window.scrollTo({ top: 0, behavior: "smooth" });
      // setHasRegistered(true);
    },
    onError: (error: AxiosError<{ message: string; subject?: string }>) => {
      const errorMessage =
        error.response?.data?.message ||
        "Registration failed. Please try again.";
      toast.error(errorMessage);
      setError("root", { type: "manual", message: errorMessage });
      if (error.response?.data?.subject) {
        setError(error.response.data.subject as any, {
          type: "manual",
          message: error.response.data.message,
        });
      }
    },
  });

  const onSubmit = (data: RegistrationFormType) => {
    if (selectedSegments.length === 0) {
      toast.error("Please select at least one segment.");
      setError("segments", {
        type: "manual",
        message: "At least one segment must be selected",
      });
      return;
    }

    if (data.grade === "" || data.grade === "select") {
      toast.error("Please select your class/grade.");
      setError("grade", { type: "manual", message: "Grade is required" });
      return;
    }
    registrationMutation.mutate(data);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full flex flex-col gap-6 max-sm:gap-10"
    >
      <PersonalInfoFields register={register} errors={errors} />
      <InstitutionInfoFields
        register={register}
        setValue={setValue}
        errors={errors}
        watch={watch}
      />

      <SegmentSelectionFields
        register={register}
        setValue={setValue}
        errors={errors}
        segments={segments.filter((segment) => !segment.isPaidSegment)}
        selectedSegments={selectedSegments}
        setSelectedSegments={setSelectedSegments}
      />

      <PaymentInformationFields
        register={register}
        errors={errors}
        transactionMethods={transactionMethods}
        fees={fees}
        eventName={eventName}
        setValue={setValue}
        watch={watch}
      />

      <ReferenceInformationFields
        register={register}
        errors={errors}
        searchParams={searchParams}
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
        disabled={registrationMutation.isPending}
      >
        {registrationMutation.isPending
          ? "Submitting..."
          : "Submit Registration"}
      </PrimaryBtn>
    </form>
  );
}
