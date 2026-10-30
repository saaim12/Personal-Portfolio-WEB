import { llmsResponse } from "@/utils/llmsResponse";

export const dynamic = "force-static";

/** Compatibility spelling; llms.txt remains the canonical reading directory. */
export function GET() {
  return llmsResponse();
}
