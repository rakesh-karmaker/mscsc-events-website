import { api } from "@/config/axios";
import axios from "axios";

export async function getAllEvents() {
  return api.get("/event/all");
}

export async function getEventBySlug(slug: string) {
  return api.get(`/event/${slug}`, {
    headers: {
      shorten: "true", // Custom header to indicate that we want shortened data
    },
  });
}

export async function getJSONData(url: string) {
  const response = await axios.get(url);
  return response.data;
}
