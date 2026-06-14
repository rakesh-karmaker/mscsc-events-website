import { useUser } from "@/hooks/use-user";
import { addSegmentTeam } from "@/lib/api/team";
import { addPaidSoloSegment } from "@/lib/api/user";
import {
  segmentRegistrationSchema,
  type SegmentRegistrationFormType,
} from "@/lib/validation/segment-registration-schema";
import type { ExplorionSegmentType } from "@/types/event-data-types";
import type {
  PaidSegmentData,
  TeamSegmentData,
  UserDataPreviewType,
} from "@/types/user-data-types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import type { AxiosError, AxiosResponse } from "axios";
import { useState, type ReactNode } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router";
import PaymentInformationFields from "./registration-form/fields/payment-information";
import { useEventData } from "@/hooks/use-event-data";
import ConfirmationFields from "./confirmation";
import PrimaryBtn from "../ui/primary-btn";
import FormBox from "./form-box";
import TextField from "@mui/material/TextField";

interface SegmentRegistrationFormProps {
  segmentInfo: ExplorionSegmentType;
}

export default function SegmentRegistrationForm({
  segmentInfo,
}: SegmentRegistrationFormProps): ReactNode {
  const eventSlug = useParams().eventSlug || "";
  const token = localStorage.getItem(`${eventSlug}-registrationToken`) || "";
  const navigate = useNavigate();
  const { user, setUser } = useUser();
  const { eventMetaData } = useEventData();

  const [method, setMethod] = useState<"addSoloPaidSegment" | "addSegmentTeam">(
    segmentInfo.teamType == "solo" ? "addSoloPaidSegment" : "addSegmentTeam",
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm({
    resolver: zodResolver(segmentRegistrationSchema),
    defaultValues: {
      segmentSlug: segmentInfo.segmentSlug,
      email: user?.email || "",
    },
  });

  const segmentRegistrationMutation = useMutation({
    mutationFn: ({
      method,
      data,
    }: {
      method: "addSoloPaidSegment" | "addSegmentTeam";
      data: SegmentRegistrationFormType;
    }) => {
      setMethod(method);
      if (method === "addSoloPaidSegment") {
        return addPaidSoloSegment(token!, eventSlug, data);
      } else if (method === "addSegmentTeam") {
        return addSegmentTeam(token!, eventSlug, data);
      }

      return Promise.reject(new Error("Invalid method"));
    },
    onSuccess: (
      res: AxiosResponse<
        { segments: string[] } & (
          | { teamSegment: TeamSegmentData }
          | { paidSoloSegment: PaidSegmentData }
        )
      >,
    ) => {
      if (method === "addSoloPaidSegment" && user) {
        const updatedUser: UserDataPreviewType = {
          ...user,
          segments: res.data.segments || [],
          paidSoloSegments:
            "paidSoloSegment" in res.data && res.data.paidSoloSegment
              ? [...(user?.paidSoloSegments || []), res.data.paidSoloSegment]
              : user?.paidSoloSegments || [],
        };
        setUser(updatedUser);

        toast.success("Paid solo segment added successfully!");
      } else if (method === "addSegmentTeam" && user) {
        const updatedUser: UserDataPreviewType = {
          ...user,
          segments: res.data.segments || [],
          teamSegmentsData:
            "teamSegment" in res.data && res.data.teamSegment
              ? [...(user?.teamSegmentsData || []), res.data.teamSegment]
              : user?.teamSegmentsData || [],
        };
        setUser(updatedUser);

        toast.success("Team segment added successfully!");
      }

      navigate(`/${eventSlug}/profile`);
    },
    onError: (error: AxiosError<{ message?: string }>) => {
      toast.error(
        error.response?.data.message ||
          "An error occurred while registering for the segment.",
      );
    },
  });

  function onSubmit(data: SegmentRegistrationFormType) {
    segmentRegistrationMutation.mutate({ method, data });
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full flex flex-col gap-6 max-sm:gap-10"
    >
      {segmentInfo.teamType == "solo" ? (
        <FormBox title="Personal Information">
          <TextField
            {...register("email")}
            id="email"
            label="Email*"
            variant="outlined"
            placeholder="Your Email"
            error={!!errors.email}
            helperText={errors.email?.message}
            fullWidth
            disabled
            aria-readonly
          />
        </FormBox>
      ) : (
        <FormBox title="Team Information">
          <div className="w-full flex gap-4 max-xl:flex-col max-xl:gap-6">
            <TextField
              {...register("teamName")}
              id="teamName"
              label="Team Name*"
              variant="outlined"
              placeholder="Your Team Name"
              error={!!errors.teamName}
              helperText={errors.teamName?.message}
              fullWidth
            />

            <TextField
              {...register("email")}
              id="email"
              label="Email Address*"
              variant="outlined"
              placeholder="Your Email Address"
              error={!!errors.email}
              helperText={errors.email?.message}
              fullWidth
              disabled
              aria-readonly
            />
          </div>
        </FormBox>
      )}

      {segmentInfo.teamType == "team" ? (
        <FormBox title="Team Members Information">
          <div className="w-full flex gap-4 max-xl:flex-col max-xl:gap-6">
            {Array.from({ length: segmentInfo.maxTeamSize - 1 }).map(
              (_, index) => (
                <TextField
                  {...register(`memberEmails.${index}`)}
                  id="email"
                  label={`Email Address ${index + 1}*`}
                  variant="outlined"
                  placeholder="Your Team Member's Email Address"
                  error={!!errors.memberEmails && !!errors.memberEmails[index]}
                  helperText={
                    errors.memberEmails && errors.memberEmails[index]
                      ? errors.memberEmails[index]?.message
                      : ""
                  }
                  fullWidth
                />
              ),
            )}
          </div>
        </FormBox>
      ) : null}

      {segmentInfo.isPaidSegment ? (
        <PaymentInformationFields
          register={register}
          errors={errors}
          transactionMethods={segmentInfo.transactionMethods || {}}
          fees={segmentInfo.fees}
          eventName={eventMetaData?.eventName || eventSlug}
          setValue={setValue}
          watch={watch}
          isSegmentRegistration={true}
        />
      ) : null}

      <ConfirmationFields
        register={register as any}
        eventName={eventMetaData?.eventName || eventSlug}
        errors={errors}
      />

      <PrimaryBtn
        type="submit"
        className="px-4! text-lg! max-sm:w-full! max-sm:self-center! max-sm:max-w-[calc(100%-10vw)]! disabled:cursor-not-allowed! disabled:opacity-50! disabled:pointer-events-none!"
        disabled={segmentRegistrationMutation.isPending}
      >
        {segmentRegistrationMutation.isPending
          ? "Submitting..."
          : "Submit Registration"}
      </PrimaryBtn>
    </form>
  );
}
