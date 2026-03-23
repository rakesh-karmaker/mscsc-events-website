import { useEffect, type ReactNode } from "react";
import { FormBox } from "../registration-form";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
} from "@mui/material";
import type {
  UseFormRegister,
  UseFormSetValue,
  UseFormWatch,
} from "react-hook-form";
import getCategory from "@/utils/get-category";
import type { RegistrationFormType } from "@/lib/validation/register-schema";
import grades from "@/utils/grades";

type InstitutionInfoFieldsProps = {
  register: UseFormRegister<RegistrationFormType>;
  setValue: UseFormSetValue<RegistrationFormType>;
  errors: { [key: string]: any };
  watch: UseFormWatch<RegistrationFormType>;
};

export default function InstitutionInfoFields({
  register,
  setValue,
  errors,
  watch,
}: InstitutionInfoFieldsProps): ReactNode {
  const gradeValue = watch("grade", "select");

  useEffect(() => {
    if (!gradeValue || gradeValue === "select") return;
    setValue("category", getCategory(gradeValue));
  }, [gradeValue]);

  return (
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
  );
}
