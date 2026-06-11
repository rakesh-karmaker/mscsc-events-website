import { api } from "@/config/axios";
import type { LoginSchemaType } from "../validation/login-schema";

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
