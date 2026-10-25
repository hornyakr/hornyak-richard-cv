import { ogAlt, ogContentType, ogSize, renderOgImage } from "@/lib/og-image";

export const alt = ogAlt("en");
export const size = ogSize;
export const contentType = ogContentType;

export default function OpengraphImage() {
  return renderOgImage("en");
}
