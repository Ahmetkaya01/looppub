import { NextResponse } from "next/server";
import { fetchLimonCategoryJson } from "@/lib/limon-menu";

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

  try {
    const res = await fetchLimonCategoryJson(id);

    if (!res.ok) {
      return NextResponse.json(
        { error: "Menu fetch failed" },
        { status: res.status },
      );
    }

    const data = await res.json();
    return NextResponse.json(data);
  } catch {
    return NextResponse.json({ error: "Menu unavailable" }, { status: 502 });
  }
}
