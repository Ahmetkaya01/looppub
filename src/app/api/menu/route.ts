import { NextResponse } from "next/server";
import { resolveMenuConfig } from "@/lib/limon-menu";

export const revalidate = 3600;
export const preferredRegion = ["fra1", "cdg1", "iad1"];

export async function GET() {
  try {
    const config = await resolveMenuConfig();
    return NextResponse.json(config);
  } catch {
    return NextResponse.json(
      { error: "Menu configuration unavailable" },
      { status: 502 },
    );
  }
}
