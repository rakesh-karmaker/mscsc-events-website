import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import { useRef } from "react";
import { Stack, TextField } from "@mui/material";
import {
  contactSchema,
  type ContactSchemaType,
} from "@/lib/validation/contactSchema";
import PrimaryBtn from "../ui/PrimaryBtn";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP);
gsap.registerPlugin(ScrollTrigger);

export default function ContactForm() {
  const contactForm = useRef<HTMLFormElement>(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = (_: ContactSchemaType) => {
    toast.success("Message Sent");

    if (contactForm.current) {
      contactForm.current.reset();
    }
  };

  useGSAP(() => {
    if (contactForm.current) {
      gsap.set(contactForm.current, {
        overflowX: "hidden",
      });

      gsap.fromTo(
        contactForm.current,
        {
          opacity: 0.6,
          x: 50,
        },
        {
          opacity: 1,
          x: 0,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: contactForm.current,
          },
        }
      );
    }
  }, []);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-[680px] max-lg:max-w-full py-16 w-full flex flex-col gap-8"
      ref={contactForm}
    >
      <div className="w-full flex flex-col gap-8">
        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={4}
          sx={{ maxWidth: "100%" }}
        >
          <TextField
            {...register("name")}
            id="name"
            label="Full Name"
            variant="standard"
            error={!!errors.name}
            helperText={errors.name?.message}
            fullWidth
          />

          <TextField
            {...register("email")}
            id="email"
            label="Email Address"
            variant="standard"
            error={!!errors.email}
            helperText={errors.email?.message}
            fullWidth
          />
        </Stack>

        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={4}
          sx={{ maxWidth: "100%" }}
        >
          <TextField
            {...register("phoneNumber")}
            id="phoneNumber"
            variant="standard"
            error={!!errors.phoneNumber}
            helperText={errors.phoneNumber?.message}
            fullWidth
            label="Phone Number"
          />

          <TextField
            {...register("subject")}
            id="subject"
            variant="standard"
            error={!!errors.subject}
            helperText={errors.subject?.message}
            fullWidth
            label="Subject"
          />
        </Stack>

        <TextField
          {...register("message")}
          id="message"
          variant="standard"
          multiline
          rows={4}
          fullWidth
          error={!!errors.message}
          helperText={errors.message?.message}
          label="Write your message here"
        />
      </div>

      <PrimaryBtn className="!px-6">Send the message</PrimaryBtn>
      {errors.root && (
        <p className="error-message text-red-500">{errors.root.message}</p>
      )}
    </form>
  );
}
