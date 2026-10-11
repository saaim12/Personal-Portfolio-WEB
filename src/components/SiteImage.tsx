import Image, { type ImageProps } from "next/image";
import { sitePath } from "@/utils/sitePath";

export default function SiteImage({ src, ...props }: ImageProps) {
  return <Image {...props} src={typeof src === "string" ? sitePath(src) : src} />;
}
