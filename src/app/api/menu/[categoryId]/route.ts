import { NextResponse } from "next/server";
const MENU_API_BASE =
  "https://123.limonpos.com.tr/nexopos/v4/products/category";

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
    const res = await fetch(`${MENU_API_BASE}/${id}`, {
      headers: {
        Accept: "application/json",
        "User-Agent": "LoopPub/1.0 (looppub.live)",
      },
      next: { revalidate: 3600 },
      signal: AbortSignal.timeout(15000),
    });

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
