import { api } from "@/config/axios";
import axios from "axios";
import type { RegistrationFormType } from "../validation/register-schema";
import type { CAApplicationType } from "../validation/ca-form-schema";
import type { UserDataPreviewType } from "@/types/user-data-types";

export async function getAllEvents() {
  return api.get("/event/all");
}

export async function getEventBySlug(
  slug: string,
  token: string | null = null,
) {
  return api.get(`/event/${slug}`, {
    ...(token
      ? {
          headers: { Authorization: `Bearer ${token}`, shorten: "true" },
        }
      : { headers: { shorten: "true" } }),
  });
}

export async function getJSONData(
  url: string,
  extraData: {
    [key: string]:
      | string
      | boolean
      | number
      | UserDataPreviewType
      | null
      | undefined;
  } = {},
) {
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

export async function applyForCA(slug: string, data: CAApplicationType) {
  const formData = new FormData();
  for (const key in data) {
    if (key === "photo" && data.photo instanceof FileList) {
      formData.append("photo", data.photo[0]);
    } else if (key === "abideByTerms" || key === "confirmDataAccuracy") {
      continue;
    } else if (key === "previousExperienceDetails") {
      formData.append(key, data.previousExperienceDetails || "N/A");
    } else {
      formData.append(key, data[key as keyof CAApplicationType] as string);
    }
  }

  return api.post(`/ca-applications/${slug}/apply`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
}
