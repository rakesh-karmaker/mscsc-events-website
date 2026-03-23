import FileInput from "@/components/ui/file-input";
import PaymentSteps from "@/components/ui/payment-steps";
import PrimaryBtn from "@/components/ui/primary-btn";
import { registerForEvent } from "@/lib/api/event";
import {
  registrationFormSchema,
  type RegistrationFormType,
} from "@/lib/validation/register-schema";
import type { SegmentType } from "@/types/global-types";
import grades from "@/utils/grades";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Checkbox,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
} from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import { useEffect, useState, type ReactNode } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useParams, useSearchParams } from "react-router";

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
  const emailValue = watch("email", "");

  useEffect(() => {
    if (!gradeValue || gradeValue === "select") return;

    const parsedGrade = parseInt(gradeValue.replace(/\D/g, ""), 10);

    if (isNaN(parsedGrade)) {
      if (gradeValue.startsWith("ssc")) {
        setValue("category", "Secondary");
      }
    } else if (parsedGrade >= 1 && parsedGrade <= 5) {
      setValue("category", "Primary");
    } else if (parsedGrade >= 6 && parsedGrade <= 8) {
      setValue("category", "Junior");
    } else if (parsedGrade >= 9 && parsedGrade <= 10) {
      setValue("category", "Secondary");
    } else if (parsedGrade >= 11 && parsedGrade <= 12) {
      setValue("category", "Higher Secondary");
    } else {
      setValue("category", "Other");
    }
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

    registrationMutation.mutate(data);
  };
  const handlePaymentMethodChange = (method: string) => {
    register("transactionMethod").onChange({ target: { value: method } });
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full flex flex-col gap-6 max-sm:gap-10"
    >
      <FormBox title="Personal Information">
        <div className="flex flex-col gap-6 max-xl:gap-6">
          <div className="w-full flex gap-4 max-xl:flex-col max-xl:gap-6">
            <TextField
              {...register("name")}
              id="name"
              label="Full Name*"
              variant="outlined"
              placeholder="Your Full name"
              error={!!errors.name}
              helperText={errors.name?.message}
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
            />
          </div>

          <div className="w-full flex gap-4 max-xl:flex-col max-xl:gap-6">
            <TextField
              {...register("phoneNumber")}
              id="phoneNumber"
              variant="outlined"
              placeholder="e.g., 01XXXXXXXXX"
              error={!!errors.phoneNumber}
              helperText={errors.phoneNumber?.message}
              fullWidth
              label="Phone Number*"
            />

            <TextField
              {...register("facebookUrl")}
              id="facebookUrl"
              label="Facebook Profile URL*"
              variant="outlined"
              placeholder="e.g., https://facebook.com/yourprofile"
              error={!!errors.facebookUrl}
              helperText={errors.facebookUrl?.message}
              fullWidth
            />
          </div>
          <FileInput register={register} errors={errors} name={"photo"}>
            Upload Your Photo*
          </FileInput>
        </div>
      </FormBox>

      <FormBox title="Institution Information">
        <div className="flex flex-col gap-6">
          <Stack spacing={3} sx={{ maxWidth: "100%" }}>
            <TextField
              {...register("institution")}
              id="institution"
              label="Institution Name*"
              variant="outlined"
              placeholder="Your Institution Name"
              error={!!errors.institution}
              helperText={errors.institution?.message}
              fullWidth
            />
            <div className="w-full flex gap-4 max-xl:flex-col max-xl:gap-6 mt-2">
              <div className="w-full flex flex-col gap-1">
                <FormControl fullWidth error={!!errors.grade} required>
                  <InputLabel id="age-grade-select">Class/Grade*</InputLabel>
                  <Select
                    labelId="age-grade-select"
                    value={gradeValue}
                    onChange={(e) => setValue("grade", e.target.value)}
                    label="Class/Grade"
                    error={!!errors.grade}
                  >
                    <MenuItem value="select" disabled>
                      <em className="text-primary">Select your class/grade</em>
                    </MenuItem>
                    {grades().map((grade) => (
                      <MenuItem key={grade.value} value={grade.value}>
                        {grade.label}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                {errors.grade && (
                  <p className="text-red-600 text-sm">
                    {errors.grade.message as string}
                  </p>
                )}
              </div>
              <TextField
                {...register("category")}
                id="category"
                label="Category (auto-filled)*"
                variant="outlined"
                error={!!errors.category}
                helperText={errors.category?.message}
                fullWidth
                defaultValue={"Select Grade"}
                InputProps={{
                  readOnly: true,
                }}
                disabled
              />
            </div>
          </Stack>
        </div>
      </FormBox>

      <FormBox title="Segment Selection">
        <div className="flex flex-col gap-6">
          <div className="w-full grid grid-cols-2 max-2xl:grid-cols-1 max-lg:grid-cols-2 max-sm:grid-cols-1 gap-4">
            {segments.map((segment, index) => (
              <div
                key={index}
                className="flex items-center px-5 py-3 rounded-sm border border-primary hover:bg-light-gray/20! transition-colors cursor-pointer"
                style={{
                  background: selectedSegments.includes(segment.title)
                    ? "color-mix(in oklab, var(--light-gray) 20%, transparent)"
                    : "color-mix(in oklab, var(--white) 20%, transparent)",
                }}
                onClick={() => {
                  let updatedSegments;
                  if (selectedSegments.includes(segment.title)) {
                    updatedSegments = selectedSegments.filter(
                      (item) => item !== segment.title,
                    );
                  } else {
                    updatedSegments = [...selectedSegments, segment.title];
                  }
                  setSelectedSegments(updatedSegments);
                  setValue("segments", updatedSegments); // Sync with form
                }}
              >
                <div className="pointer-events-none">
                  <FormControlLabel
                    control={
                      <Checkbox
                        {...register("segments")}
                        checked={selectedSegments.includes(segment.title)}
                        style={{
                          color: "var(--primary-color)",
                        }}
                      />
                    }
                    label={segment.title}
                    style={{
                      pointerEvents: "none",
                      color: "var(--primary-color)",
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
          {errors.segments && (
            <p className="text-red-600 text-sm">
              {errors.segments.message as string}
            </p>
          )}
        </div>
      </FormBox>

      <FormBox title="Payment Information">
        <div className="flex flex-col gap-6">
          <div className="w-full flex flex-col gap-2">
            <h3 className="text-xl max-sm:text-lg font-medium text-primary">
              Select Transaction Method:
            </h3>
            <div>
              <PaymentSteps
                transactionMethods={transactionMethods}
                setMethod={handlePaymentMethodChange}
                fees={fees}
                ref={`${eventName} - ${emailValue || "your email"}`}
              />
            </div>
          </div>
          <Stack spacing={3} sx={{ maxWidth: "100%" }}>
            <TextField
              {...register("transactionPhoneNumber")}
              id="transactionPhoneNumber"
              label="Payment Phone Number*"
              variant="outlined"
              placeholder="Your Payment Phone Number"
              error={!!errors.transactionPhoneNumber}
              helperText={errors.transactionPhoneNumber?.message}
              fullWidth
            />

            <TextField
              {...register("transactionId")}
              id="transactionId"
              label="Transaction ID*"
              variant="outlined"
              placeholder="Your Transaction ID"
              error={!!errors.transactionId}
              helperText={errors.transactionId?.message}
              fullWidth
            />
          </Stack>
        </div>
      </FormBox>

      <FormBox title="Reference Information">
        <div className="flex flex-col gap-2">
          <p className="text-[1.1rem]">
            Campus Ambassador or how did you hear about us?
          </p>
          <div className="w-full flex gap-4 max-xl:flex-col max-xl:gap-6 mt-2">
            <TextField
              {...register("reference")}
              id="reference"
              label="Reference (optional)"
              variant="outlined"
              placeholder="Campus Ambassador Name"
              error={!!errors.reference}
              helperText={errors.reference?.message}
              fullWidth
            />
            <TextField
              {...register("clubReference")}
              id="clubReference"
              label="Club Reference (optional)"
              variant="outlined"
              placeholder="Your Club Name"
              error={!!errors.clubReference}
              helperText={errors.clubReference?.message}
              disabled={!!searchParams.get("club-ref")}
              fullWidth
            />
          </div>
        </div>
      </FormBox>

      <FormBox title="Confirmation" hideTitle={true}>
        <div className="flex flex-col gap-5">
          <p className="italic text-primary">
            Note: Any provision of false or incorrect information will result in
            the immediate forfeiture of any prizes or titles won.
          </p>
          <div className="w-full flex flex-col gap-1.5">
            <FormControlLabel
              control={
                <Checkbox
                  required
                  {...register("abideByTerms")}
                  style={{ color: "var(--primary-color)" }}
                />
              }
              label={
                <p className="text-text text-base/snug">
                  I agree to abide by the Code of Conduct of the {eventName}. I
                  understand that any violation may result in my immediate
                  disqualification from the premises. Furthermore, I acknowledge
                  that the organizers reserve the right to pursue necessary
                  legal action in response to any serious misconduct or damages.
                </p>
              }
              style={{
                color: "var(--primary-color)",
                alignItems: "flex-start",
              }}
              sx={{
                "& .MuiFormControlLabel-asterisk": {
                  display: "none", // or visibility: 'hidden'
                },
              }}
            />

            <FormControlLabel
              control={
                <Checkbox
                  required
                  {...register("confirmDataAccuracy")}
                  style={{ color: "var(--primary-color)" }}
                />
              }
              label={
                <p className="text-text text-base/snug">
                  I hereby certify that all information provided above is true
                  and accurate to the best of my knowledge.
                </p>
              }
              style={{ color: "var(--primary-color)" }}
              sx={{
                "& .MuiFormControlLabel-asterisk": {
                  display: "none", // or visibility: 'hidden'
                },
              }}
            />
          </div>
        </div>
      </FormBox>

      <PrimaryBtn
        type="submit"
        className="px-4! text-lg! max-sm:w-full! max-sm:self-center! max-sm:max-w-[calc(100%-10vw)]!"
        disabled={registrationMutation.isPending}
      >
        Submit Registration
      </PrimaryBtn>
    </form>
  );
}

function FormBox({
  children,
  title,
  hideTitle = false,
}: {
  children: ReactNode;
  title: string;
  hideTitle?: boolean;
}): ReactNode {
  return (
    <div className="w-full h-fit flex flex-col gap-8 p-8 bg-secondary-bg border-2 border-primary max-sm:border-l-0 max-sm:border-r-0 max-sm:rounded-none max-sm:p-[5vw] rounded-lg">
      {!hideTitle && (
        <h2 className="text-3xl max-sm:text-2xl text-primary font-medium pb-3 border-b border-primary">
          {title}
        </h2>
      )}
      <div>{children}</div>
    </div>
  );
}
