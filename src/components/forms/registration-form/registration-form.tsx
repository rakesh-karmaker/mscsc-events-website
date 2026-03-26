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

type RegistrationFormProps = {
  transactionMethods: {
    [platform: string]: { number: string; code: string; qrCodeUrl?: string };
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
  const eventSlug = useParams().eventId || "event-slug"; // Replace with actual slug from params
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
    onSuccess: () => {
      toast.success("Registration successful!");
    },
    onError: (error: any) => {
      const errorMessage =
        error.response?.data?.message ||
        "Registration failed. Please try again.";
      toast.error(errorMessage);
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

    // filter the teamSegmentsData
    let doesHaveTeamSegmentError = false;
    const teamSegmentsData: {
      [segmentSlug: string]: {
        teamName: string;
        leaderEmail: string;
        memberEmails: string[];
      };
    } = {};

    selectedSegments.forEach((segmentName: string) => {
      const segment: SegmentType | undefined = segments.find(
        (s) => s.title === segmentName,
      );
      if (!segment || segment.teamType !== "team") {
        return;
      }
      if (
        !data.teamSegmentsData ||
        !data.teamSegmentsData[segment.segmentSlug]
      ) {
        toast.error(
          `Please fill out team information for the ${segment.title} segment.`,
        );
        setError("teamSegmentsData", {
          type: "manual",
          message: `Team information is required for ${segment.title}`,
        });
        doesHaveTeamSegmentError = true;
        return;
      }
      // check the field values
      const teamData = data.teamSegmentsData[segment.segmentSlug];
      if (!teamData.teamName) {
        setError(`teamSegmentsData.${segment.segmentSlug}.teamName`, {
          type: "manual",
          message: "Team name is required",
        });
        doesHaveTeamSegmentError = true;
      }
      if (!teamData.leaderEmail) {
        setError(`teamSegmentsData.${segment.segmentSlug}.leaderEmail`, {
          type: "manual",
          message: "Team leader email is required",
        });
        doesHaveTeamSegmentError = true;
      }

      teamSegmentsData[segment.segmentSlug] = {
        teamName: teamData.teamName,
        leaderEmail: teamData.leaderEmail,
        memberEmails:
          teamData.memberEmails.filter(
            (email: string) => email && email.trim() !== "",
          ) || [],
      };
    });

    // If there are any team segment errors, do not proceed
    if (doesHaveTeamSegmentError) {
      return;
    }

    const { teamSegmentsData: _, ...restData } = data;
    registrationMutation.mutate({ ...restData, teamSegmentsData });
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
        segments={segments}
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
