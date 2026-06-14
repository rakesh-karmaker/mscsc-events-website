import { api } from "@/config/axios";
import type { LoginSchemaType } from "../validation/login-schema";
import type { SegmentRegistrationFormType } from "../validation/segment-registration-schema";
import dayjs from "dayjs";

export async function getUserData(token: string, eventSlug: string) {
  return api.get(`/event-registrations/${eventSlug}/registrations/get-data`, {
    headers: { Authorization: `Bearer ${token}` },
  });
}

export async function loginUser(eventSlug: string, data: LoginSchemaType) {
  const formdata = new FormData();
  formdata.append("email", data.email);
  formdata.append("password", data.password);

  return api.post(
    `/event-registrations/${eventSlug}/registrations/login`,
    formdata,
  );
}

export async function addFreeSoloSegment(
  token: string,
  eventSlug: string,
  segmentSlug: string,
) {
  return api.patch(
    `/event-registrations/${eventSlug}/registrations/add-free-solo-segment`,
    { segmentSlug },
    {
      headers: { Authorization: `Bearer ${token}` },
    },
  );
}

export async function addPaidSoloSegment(
  token: string,
  eventSlug: string,
  data: SegmentRegistrationFormType,
) {
  const formData = new FormData();
  for (const key in data) {
    if (key === "abideByTerms" || key === "confirmDataAccuracy") {
      continue; // Skip these fields as they are not needed in the API request
    }
    formData.append(
      key,
      data[key as keyof SegmentRegistrationFormType] as string,
    );
  }

  formData.append("registrationDate", dayjs().toISOString());

  return api.patch(
    `/event-registrations/${eventSlug}/registrations/add-paid-solo-segment`,
    formData,
    {
      headers: { Authorization: `Bearer ${token}` },
    },
  );
}
