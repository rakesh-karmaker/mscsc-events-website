import type { CAApplicationType } from "@/lib/validation/ca-form-schema";
import { useState, type ReactNode } from "react";
import type { UseFormRegister, UseFormSetValue } from "react-hook-form";
import FormBox from "../../form-box";
import { Stack, TextField } from "@mui/material";
import RadioField from "@/components/ui/radio-field";

type ExperienceInfoFieldsProps = {
  register: UseFormRegister<CAApplicationType>;
  errors: { [key: string]: any };
  setValue: UseFormSetValue<CAApplicationType>;
};

export default function ExperienceInfoFields({
  register,
  errors,
  setValue,
}: ExperienceInfoFieldsProps): ReactNode {
  const [hasPrevExp, setHasPrevExp] = useState<boolean>(true);
  function handleHasPrevExpRadioClick(value: string) {
    if (value === "yes") setValue("hasPreviousExperience", "yes");
    else if (value === "no") setValue("hasPreviousExperience", "no");

    setHasPrevExp(value === "yes");
  }

  return (
    <FormBox title="Experience Information">
      <Stack spacing={2} sx={{ maxWidth: "100%" }}>
        <TextField
          {...register("description")}
          id="description"
          label="Describe your relevant experience and skills*"
          variant="outlined"
          placeholder="Describe your relevant experience and skills"
          error={!!errors.description}
          helperText={errors.description?.message}
          fullWidth
          multiline
          minRows={4}
        />
        <Stack spacing={2} sx={{ maxWidth: "100%" }}>
          <RadioField
            options={["yes", "no"]}
            onClick={handleHasPrevExpRadioClick}
            selectedOption={hasPrevExp ? "yes" : "no"}
            errors={errors && errors.hasPreviousExperience}
          >
            <h3 className="text-lg text-text">
              Do you have previous campus ambassador experience?
            </h3>
          </RadioField>
          <div
            className="w-full h-fit overflow-hidden grid transition-all duration-200 ease-in-out"
            style={{
              gridTemplateRows: hasPrevExp ? "1fr" : "0fr",
            }}
          >
            <div className="w-full h-full overflow-hidden pt-3">
              <TextField
                {...register("previousExperienceDetails")}
                id="previousExperienceDetails"
                label="Describe your previous experience"
                variant="outlined"
                placeholder="Describe your previous experience"
                error={!!errors.previousExperienceDetails}
                helperText={errors.previousExperienceDetails?.message}
                fullWidth
                multiline
                minRows={4}
              />
            </div>
          </div>
        </Stack>
      </Stack>
    </FormBox>
  );
}
