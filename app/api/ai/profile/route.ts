import { NextRequest, NextResponse } from "next/server";
import { getPublicResumeKnowledge } from "@/lib/resume/knowledge";

export function GET(request: NextRequest) {
  const locale = request.nextUrl.searchParams.get("locale") === "fa" ? "fa" : "en";
  return NextResponse.json(getPublicResumeKnowledge(locale), {
    headers: {
      "Cache-Control": "public, max-age=300, s-maxage=86400, stale-while-revalidate=604800",
      "X-Robots-Tag": "noindex, nofollow",
    },
  });
}
