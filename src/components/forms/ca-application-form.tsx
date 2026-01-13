import {
  caFormSchema,
  type CAFormSchemaType,
} from "@/lib/validation/ca-form-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Stack, TextField } from "@mui/material";
import { useState, type ReactNode } from "react";
import { useForm } from "react-hook-form";
import FileInput from "../ui/file-input";
import PrimaryBtn from "../ui/primary-btn";
import RadioField from "../ui/radio-field";

export default function CAApplicationForm(): ReactNode {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: zodResolver(caFormSchema),
  });

  function onSubmit(data: CAFormSchemaType) {
    console.log(data);
  }

  const [selectedGender, setSelectedGender] = useState<"male" | "female" | "">(
    ""
  );
  function handleGenderRadioClick(gender: string) {
    if (gender === "male") setValue("gender", "male");
    else if (gender === "female") setValue("gender", "female");
    setSelectedGender(gender as "male" | "female");
  }

  const [hasPrevExp, setHasPrevExp] = useState<boolean>(true);
  function handleHasPrevExpRadioClick(value: string) {
    if (value === "yes") setValue("havePreviousExperience", "yes");
    else if (value === "no") setValue("havePreviousExperience", "no");

    setHasPrevExp(value === "yes");
  }

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
          <FileInput register={register} errors={errors} name={"photo"}>
            Upload Your Photo
          </FileInput>

          <TextField
            {...register("address")}
            id="address"
            label="Address"
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
          >
            <h3 className="text-lg text-text">Gender</h3>
          </RadioField>
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

      <FormBox title="Experience Information">
        <Stack spacing={2} sx={{ maxWidth: "100%" }}>
          <RadioField
            options={["yes", "no"]}
            onClick={handleHasPrevExpRadioClick}
            selectedOption={hasPrevExp ? "yes" : "no"}
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
                {...register("description")}
                id="description"
                label="Describe your previous experience"
                variant="outlined"
                placeholder="Describe your previous experience"
                error={!!errors.description}
                helperText={errors.description?.message}
                fullWidth
                multiline
                minRows={4}
              />
            </div>
          </div>
        </Stack>
      </FormBox>

      <PrimaryBtn
        type="submit"
        className="px-4! text-lg! max-sm:w-full! max-sm:self-center! max-sm:max-w-[calc(100%-10vw)]!"
      >
        Submit Application
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
    <div className="w-full h-fit flex flex-col gap-8 p-8 bg-secondary-bg border-2 border-primary max-sm:border-l-0 max-sm:border-r-0 max-sm:rounded-none max-sm:p-[5vw] rounded-lg">
      <h2 className="text-3xl max-sm:text-2xl text-primary font-medium pb-3 border-b border-primary">
        {title}
      </h2>
      <div>{children}</div>
    </div>
  );
}
