import { TextField } from "@mui/material";
import FileInput from "@/components/ui/file-input";
import type { ReactNode } from "react";
import type { RegistrationFormType } from "@/lib/validation/register-schema";
import type { UseFormRegister } from "react-hook-form";
import FormBox from "../../form-box";

type PersonalInfoFieldsProps = {
  register: UseFormRegister<RegistrationFormType>;
  errors: { [key: string]: any };
};

export default function PersonalInfoFields({
  register,
  errors,
}: PersonalInfoFieldsProps): ReactNode {
  return (
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
            {...register("password")}
            id="password"
            label="Password*"
            variant="outlined"
            placeholder="Create a password"
            error={!!errors.password}
            helperText={errors.password?.message}
            fullWidth
          />

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
        </div>

        <div className="w-full flex items-center gap-4 max-xl:flex-col max-xl:gap-6">
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

          <FileInput register={register} errors={errors} name={"photo"}>
            Your Photo*
          </FileInput>
        </div>
      </div>
    </FormBox>
  );
}
