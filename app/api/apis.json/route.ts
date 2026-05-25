import { NextResponse } from "next/server";
import { APIS } from "@/data/apis";

export const dynamic = "force-static";

export function GET() {
  const feed = APIS.map(({ endpoints: _e, ...api }) => api);
  return NextResponse.json(
    { count: feed.length, generated: new Date().toISOString(), apis: feed },
    { headers: { "Access-Control-Allow-Origin": "*" } }
  );
}
