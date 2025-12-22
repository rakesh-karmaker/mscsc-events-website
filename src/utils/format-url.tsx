export default function formatUrl(platform: string, url: string): string {
  let href = url;

  if (platform === "email") {
    href = `mailto:${url}`;
  } else if (platform === "phone") {
    const number = url.replace(/\s+/g, "").replace("+880", ""); // Remove spaces and prefix
    href = `tel:${number.slice(0, 5)}-${number.slice(5)}`; // add - after 5th digit
  }

  return href;
}
