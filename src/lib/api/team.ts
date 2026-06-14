import { api } from "@/config/axios";
import type { SegmentRegistrationFormType } from "../validation/segment-registration-schema";

export async function addSegmentTeam(
  token: string,
  eventSlug: string,
  data: SegmentRegistrationFormType,
) {
  const formData = new FormData();
  for (const key in data) {
    if (key === "memberEmails" && Array.isArray(data.memberEmails)) {
      data.memberEmails.forEach((email) =>
        formData.append("memberEmails[]", email),
      );
    } else if (key === "abideByTerms" || key === "confirmDataAccuracy") {
      continue; // Skip these fields as they are not needed in the API request
    } else if (key == "email") {
      formData.append("leaderEmail", data.email);
    } else {
      formData.append(
        key,
        data[key as keyof SegmentRegistrationFormType] as string,
      );
    }
  }

  return api.post(`/teams/${eventSlug}/create`, formData, {
    headers: { Authorization: `Bearer ${token}` },
  });
}
