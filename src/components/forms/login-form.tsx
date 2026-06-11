import { useUser } from "@/hooks/use-user";
import type { ReactNode } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  loginSchema,
  type LoginSchemaType,
} from "@/lib/validation/login-schema";
import { useMutation } from "@tanstack/react-query";
import { loginUser } from "@/lib/api/user";
import type { AxiosError, AxiosResponse } from "axios";
import type { UserDataPreviewType } from "@/types/user-data-types";
import toast from "react-hot-toast";
import PrimaryBtn from "../ui/primary-btn";
import FormBox from "./form-box";
import TextField from "@mui/material/TextField";

export default function LoginForm(): ReactNode {
  const eventSlug = useParams().eventSlug || "";
  const { setUser } = useUser();
  const navigate = useNavigate();

  const loginMutation = useMutation({
    mutationFn: async (data: LoginSchemaType) => loginUser(eventSlug, data),
    onSuccess: (
      res: AxiosResponse<{
        token: string;
        message: string;
        userData: UserDataPreviewType;
      }>,
    ) => {
      const { token, userData } = res.data;
      localStorage.setItem(`${eventSlug}-registrationToken`, token);
      setUser(userData);
      toast.success("Login successful!");
      navigate(`/${eventSlug}/profile`);
    },
    onError: (err: AxiosError<{ message?: string }>) => {
      console.error("Login error:", err);
      setError("root", {
        type: "server",
        message: "invalid Credentials",
      });
      toast.error(
        err.response?.data?.message || "An error occurred during login",
      );
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  function onSubmit(data: LoginSchemaType) {
    loginMutation.mutate(data);
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full flex flex-col gap-6 max-sm:gap-10"
    >
      <FormBox title="Personal Information">
        <div className="flex flex-col gap-6 max-xl:gap-6">
          <div className="flex flex-col gap-6">
            <TextField
              {...register("email")}
              id="email"
              label="Email Address*"
              variant="outlined"
              placeholder="eg. john.doe@example.com"
              error={!!errors.email}
              helperText={errors.email?.message}
              fullWidth
            />

            <TextField
              {...register("password")}
              id="password"
              label="Password*"
              variant="outlined"
              placeholder="eg. ••••••••"
              error={!!errors.password}
              helperText={errors.password?.message}
              fullWidth
            />
          </div>
        </div>
      </FormBox>

      <PrimaryBtn
        type="submit"
        className="px-4! text-lg! max-sm:w-full! max-sm:self-center! max-sm:max-w-[calc(100%-10vw)]! disabled:cursor-not-allowed! disabled:opacity-50! disabled:pointer-events-none!"
        disabled={loginMutation.isPending}
      >
        {loginMutation.isPending ? "Logging in..." : "Login"}
      </PrimaryBtn>
    </form>
  );
}
