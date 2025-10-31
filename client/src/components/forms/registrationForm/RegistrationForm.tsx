import PaymentSteps from "@/components/ui/PaymentSteps";
import PrimaryBtn from "@/components/ui/PrimaryBtn";
import {
  registerSchema,
  type RegisterSchemaType,
} from "@/lib/validation/registerSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Stack, TextField } from "@mui/material";
import type { ReactNode } from "react";
import { useForm } from "react-hook-form";

type RegistrationFormProps = {
  transactionMethods: {
    [platform: string]: { number: string; code: string; qrCodeUrl?: string };
  };
  fees: number;
};

export default function RegistrationForm({
  transactionMethods,
  fees,
}: RegistrationFormProps): ReactNode {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = (data: RegisterSchemaType) => {
    console.log(data);
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
              label="Full Name"
              variant="outlined"
              placeholder="Your Full name"
              error={!!errors.name}
              helperText={errors.name?.message}
              fullWidth
            />

            <TextField
              {...register("email")}
              id="email"
              label="Email Address"
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
              label="Phone Number"
            />

            <TextField
              {...register("facebookUrl")}
              id="facebookUrl"
              label="Facebook Profile URL"
              variant="outlined"
              placeholder="e.g., https://facebook.com/yourprofile"
              error={!!errors.facebookUrl}
              helperText={errors.facebookUrl?.message}
              fullWidth
            />
          </div>
        </div>
      </FormBox>
      <FormBox title="Institution Information">
        <div className="flex flex-col gap-6">
          <Stack spacing={3} sx={{ maxWidth: "100%" }}>
            <TextField
              {...register("institution")}
              id="institution"
              label="Institution Name"
              variant="outlined"
              placeholder="Your Institution Name"
              error={!!errors.institution}
              helperText={errors.institution?.message}
              fullWidth
            />

            <TextField
              {...register("grade")}
              id="grade"
              label="Class/Grade"
              variant="outlined"
              placeholder="Your Class/Grade"
              error={!!errors.grade}
              helperText={errors.grade?.message}
              fullWidth
            />
          </Stack>
        </div>
      </FormBox>
      <FormBox title="Payment Information">
        <div className="flex flex-col gap-6">
          <div className="w-full flex flex-col gap-2">
            <h3 className="text-xl max-sm:text-lg font-medium">
              Select Transaction Method:
            </h3>
            <div>
              <PaymentSteps
                transactionMethods={transactionMethods}
                setMethod={handlePaymentMethodChange}
                fees={fees}
              />
            </div>
          </div>
          <Stack spacing={3} sx={{ maxWidth: "100%" }}>
            <TextField
              {...register("transactionPhoneNumber")}
              id="transactionPhoneNumber"
              label="Payment Phone Number"
              variant="outlined"
              placeholder="Your Payment Phone Number"
              error={!!errors.transactionPhoneNumber}
              helperText={errors.transactionPhoneNumber?.message}
              fullWidth
            />

            <TextField
              {...register("transactionId")}
              id="transactionId"
              label="Transaction ID"
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
          <TextField
            {...register("reference")}
            id="reference"
            label="Reference"
            variant="outlined"
            placeholder="Campus Ambassador Name"
            error={!!errors.reference}
            helperText={errors.reference?.message}
            fullWidth
          />
        </div>
      </FormBox>

      <PrimaryBtn type="submit" className="!px-4 !text-lg">
        Submit Registration{" "}
      </PrimaryBtn>
    </form>
  );
}

function FormBox({
  children,
  title,
}: {
  children: ReactNode;
  title: string;
}): ReactNode {
  return (
    <div className="w-full h-fit flex flex-col gap-8 p-8 max-sm:shadow-none max-sm:p-0 max-sm:bg-white bg-pure-white shadow-[0px_0px_0px_1px_rgba(0,_0,_0,_0.1)] rounded-lg">
      <h2 className="text-3xl max-sm:text-2xl font-medium pb-3 border-b-1 border-light-gray/90">
        {title}
      </h2>
      <div>{children}</div>
    </div>
  );
}
