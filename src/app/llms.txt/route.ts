import { llmsResponse } from "@/utils/llmsResponse";

export const dynamic = "force-static";

/** Public AI reading directory; generated from canonical site content. */
export function GET() {
  return llmsResponse();
}
