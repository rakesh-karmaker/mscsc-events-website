import { TextField } from "@mui/material";
import FileInput from "@/components/ui/file-input";
import { useState, type ReactNode } from "react";
import type { UseFormRegister, UseFormSetValue } from "react-hook-form";
import FormBox from "../../form-box";
import type { CAApplicationType } from "@/lib/validation/ca-form-schema";
import RadioField from "@/components/ui/radio-field";

type PersonalInfoFieldsProps = {
  register: UseFormRegister<CAApplicationType>;
  errors: { [key: string]: any };
  setValue: UseFormSetValue<CAApplicationType>;
};

export default function PersonalInfoFields({
  register,
  errors,
  setValue,
}: PersonalInfoFieldsProps): ReactNode {
  const [selectedGender, setSelectedGender] = useState<"male" | "female" | "">(
    "",
  );

  function handleGenderRadioClick(gender: string) {
    if (gender === "male") setValue("gender", "male");
    else if (gender === "female") setValue("gender", "female");
    setSelectedGender(gender as "male" | "female");
  }

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
          Upload Your Photo
        </FileInput>

        <TextField
          {...register("address")}
          id="address"
          label="Address*"
          variant="outlined"
          placeholder="Your Address"
          error={!!errors.address}
          helperText={errors.address?.message}
          fullWidth
        />

        <RadioField
          options={["male", "female"]}
          onClick={handleGenderRadioClick}
          selectedOption={selectedGender}
          errors={errors && errors.gender}
        >
          <h3 className="text-lg text-text">Gender</h3>
        </RadioField>
      </div>
    </FormBox>
  );
}
