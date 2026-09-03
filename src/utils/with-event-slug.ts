import { EVENT_SLUG, IS_DIFFERENT_DOMAIN } from "@/config/constants";

export default function withEventSlug(url: string, slug: string): string {
  const eventSlug = IS_DIFFERENT_DOMAIN ? EVENT_SLUG : slug;
  if (IS_DIFFERENT_DOMAIN) {
    return `${url}`;
  } else {
    return `/${eventSlug}${url}`;
  }
}
