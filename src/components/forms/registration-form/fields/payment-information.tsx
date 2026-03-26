import type { RegistrationFormType } from "@/lib/validation/register-schema";
import type { ReactNode } from "react";
import type {
  UseFormRegister,
  UseFormSetValue,
  UseFormWatch,
} from "react-hook-form";
import PaymentSteps from "@/components/ui/payment-steps";
import { Stack, TextField } from "@mui/material";
import FormBox from "../../form-box";

type PaymentInformationFieldsProps = {
  register: UseFormRegister<RegistrationFormType>;
  errors: { [key: string]: any };
  transactionMethods: {
    [platform: string]: { number: string; code: string; qrCodeUrl?: string };
  };
  fees: number;
  eventName: string;
  setValue: UseFormSetValue<RegistrationFormType>;
  watch: UseFormWatch<RegistrationFormType>;
};

export default function PaymentInformationFields({
  register,
  errors,
  transactionMethods,
  fees,
  eventName,
  setValue,
  watch,
}: PaymentInformationFieldsProps): ReactNode {
  const handlePaymentMethodChange = (method: string) => {
    setValue("transactionMethod", method);
  };

  const emailValue = watch("email", "");

  return (
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
  );
}
