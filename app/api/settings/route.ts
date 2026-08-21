import { NextResponse } from "next/server";
import { getAppSettings, saveAppSettings, HomePageMode } from "@/lib/settings";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const settings = await getAppSettings();
    return NextResponse.json(settings, {
      headers: {
        "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0",
      },
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to load application settings" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { homePageMode } = body;

    if (
      homePageMode &&
      homePageMode !== "ecommerce" &&
      homePageMode !== "informational"
    ) {
      return NextResponse.json(
        { error: "Invalid homePageMode. Must be 'ecommerce' or 'informational'" },
        { status: 400 }
      );
    }

    const updated = await saveAppSettings({
      homePageMode: homePageMode as HomePageMode,
    });

    return NextResponse.json(updated, {
      headers: {
        "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0",
      },
    });
  } catch (error) {
    console.error("Settings update error:", error);
    return NextResponse.json(
      { error: "Failed to update settings" },
      { status: 500 }
    );
  }
}
