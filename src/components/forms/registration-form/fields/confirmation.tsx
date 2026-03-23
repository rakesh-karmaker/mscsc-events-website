import type { RegistrationFormType } from "@/lib/validation/register-schema";
import type { ReactNode } from "react";
import type { UseFormRegister } from "react-hook-form";
import { FormBox } from "../registration-form";
import { Checkbox, FormControlLabel } from "@mui/material";

type ConfirmationFieldsProps = {
  register: UseFormRegister<RegistrationFormType>;
  eventName: string;
};

export default function ConfirmationFields({
  register,
  eventName,
}: ConfirmationFieldsProps): ReactNode {
  return (
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
                that the organizers reserve the right to pursue necessary legal
                action in response to any serious misconduct or damages.
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
                I hereby certify that all information provided above is true and
                accurate to the best of my knowledge.
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
  );
}
