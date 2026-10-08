import { handleIntakeRequest } from "@/lib/support-intake/proxy";

// POST only: Next.js answers other methods with 405. Node runtime for `node:net`.
export async function POST(request: Request) {
  return handleIntakeRequest("report", request);
}
