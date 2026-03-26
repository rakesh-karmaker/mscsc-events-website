import type { RegistrationFormType } from "@/lib/validation/register-schema";
import type { ReactNode } from "react";
import type { UseFormRegister } from "react-hook-form";
import { TextField } from "@mui/material";
import FormBox from "../../form-box";

type ReferenceInformationFieldsProps = {
  register: UseFormRegister<RegistrationFormType>;
  errors: { [key: string]: any };
  searchParams: URLSearchParams;
};

export default function ReferenceInformationFields({
  register,
  errors,
  searchParams,
}: ReferenceInformationFieldsProps): ReactNode {
  return (
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
  );
}
