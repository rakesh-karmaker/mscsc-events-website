import { api } from "@/config/axios";

export async function getAllEvents() {
  return api.get("/event/all");
}

export async function getEventBySlug(slug: string) {
  return api.get(`/event/${slug}`);
}
