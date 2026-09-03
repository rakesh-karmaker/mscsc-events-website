export const API_URL = import.meta.env.VITE_API_URL;
export const EVENT_SLUG = import.meta.env.VITE_EVENT_SLUG;
export const IS_DIFFERENT_DOMAIN =
  import.meta.env.VITE_IS_DIFFERENT_DOMAIN === "true";
console.log("API_URL:", API_URL);
console.log("EVENT_SLUG:", EVENT_SLUG);
console.log("IS_DIFFERENT_DOMAIN:", IS_DIFFERENT_DOMAIN);
