import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { getPexelsImages } from "@/lib/pexels";

export async function GET() {
  try {
    const { userId, orgId } = await auth();

    // Защита: только авторизованные пользователи могут запрашивать картинки
    if (!userId || !orgId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const images = await getPexelsImages(9);
    return NextResponse.json(images);
  } catch (error) {
    return new NextResponse("Internal Error", { status: 500 });
  }
}