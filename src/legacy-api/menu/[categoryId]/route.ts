import { NextResponse } from "next/server";
import { fetchLimonCategoryPayload } from "@/lib/limon-menu";
import { readCachedCategoryPayload } from "@/lib/menu-cache";

export const runtime = "nodejs";
export const revalidate = 3600;
export const preferredRegion = ["fra1", "cdg1", "iad1"];

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ categoryId: string }> },
) {
  const { categoryId } = await params;
  const id = Number(categoryId);

  if (!Number.isFinite(id) || id <= 0) {
    return NextResponse.json({ error: "Invalid category" }, { status: 400 });
  }

  const live = await fetchLimonCategoryPayload(id);
  if (live) {
    return NextResponse.json(live, {
      headers: { "X-Menu-Source": "live" },
    });
  }

  const cached = await readCachedCategoryPayload(id);
  if (cached) {
    return NextResponse.json(cached, {
      headers: { "X-Menu-Source": "cache" },
    });
  }

  return NextResponse.json({ error: "Menu unavailable" }, { status: 502 });
}
