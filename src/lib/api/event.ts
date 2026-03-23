import { api } from "@/config/axios";
import axios from "axios";
import type { RegistrationFormType } from "../validation/register-schema";

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

export async function getJSONData(url: string, extraData: any = {}) {
  const response = await axios.get(url);
  return { ...response.data, ...extraData };
}

export async function registerForEvent(
  slug: string,
  data: RegistrationFormType,
) {
  const formData = new FormData();
  for (const key in data) {
    if (key === "photo" && data.photo instanceof FileList) {
      formData.append("photo", data.photo[0]);
    } else if (key === "segments" && Array.isArray(data.segments)) {
      data.segments.forEach((segment) =>
        formData.append("segments[]", segment),
      );
    } else if (key === "abideByTerms" || key === "confirmDataAccuracy") {
      continue;
    } else if (key === "reference" || key === "clubReference") {
      formData.append(key, data[key] || "N/A");
    } else if (key === "teamSegmentsData") {
      formData.append(key, JSON.stringify(data[key]));
    } else {
      formData.append(key, data[key as keyof RegistrationFormType] as string);
    }
  }

  return api.post(`/event-registrations/${slug}/register`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
}
