import { api } from "@/config/axios";

export async function getUserData(token: string, eventSlug: string) {
  return api.get(`/event-registrations/${eventSlug}/registrations/get-data`, {
    headers: { Authorization: `Bearer ${token}` },
  });
}
