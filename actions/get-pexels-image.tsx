"use server";
import { getPexelsImages as getImages } from "@/lib/pexels";

export const getImage = async (count: number) => {
  return await getImages(count);
};

export type PexelsImage = {
  id: string;
  thumbUrl: string;
  fullUrl: string;
  linkHTML: string;
  userName: string;
};

const FALLBACK_IMAGES: PexelsImage[] = [
  {
    id: "fb-1",
    thumbUrl: "https://picsum.photos/seed/focus-1/400/240",
    fullUrl: "https://picsum.photos/seed/focus-1/1600/900",
    linkHTML: "https://picsum.photos/",
    userName: "Picsum",
  },
  {
    id: "fb-2",
    thumbUrl: "https://picsum.photos/seed/focus-2/400/240",
    fullUrl: "https://picsum.photos/seed/focus-2/1600/900",
    linkHTML: "https://picsum.photos/",
    userName: "Picsum",
  },
  {
    id: "fb-3",
    thumbUrl: "https://picsum.photos/seed/focus-3/400/240",
    fullUrl: "https://picsum.photos/seed/focus-3/1600/900",
    linkHTML: "https://picsum.photos/",
    userName: "Picsum",
  },
  {
    id: "fb-4",
    thumbUrl: "https://picsum.photos/seed/focus-4/400/240",
    fullUrl: "https://picsum.photos/seed/focus-4/1600/900",
    linkHTML: "https://picsum.photos/",
    userName: "Picsum",
  },
  {
    id: "fb-5",
    thumbUrl: "https://picsum.photos/seed/focus-5/400/240",
    fullUrl: "https://picsum.photos/seed/focus-5/1600/900",
    linkHTML: "https://picsum.photos/",
    userName: "Picsum",
  },
  {
    id: "fb-6",
    thumbUrl: "https://picsum.photos/seed/focus-6/400/240",
    fullUrl: "https://picsum.photos/seed/focus-6/1600/900",
    linkHTML: "https://picsum.photos/",
    userName: "Picsum",
  },
  {
    id: "fb-7",
    thumbUrl: "https://picsum.photos/seed/focus-7/400/240",
    fullUrl: "https://picsum.photos/seed/focus-7/1600/900",
    linkHTML: "https://picsum.photos/",
    userName: "Picsum",
  },
  {
    id: "fb-8",
    thumbUrl: "https://picsum.photos/seed/focus-8/400/240",
    fullUrl: "https://picsum.photos/seed/focus-8/1600/900",
    linkHTML: "https://picsum.photos/",
    userName: "Picsum",
  },
  {
    id: "fb-9",
    thumbUrl: "https://picsum.photos/seed/focus-9/400/240",
    fullUrl: "https://picsum.photos/seed/focus-9/1600/900",
    linkHTML: "https://picsum.photos/",
    userName: "Picsum",
  },
];

export async function getPexelsImages(count = 9): Promise<PexelsImage[]> {
  try {
    const images = await getImages(count);

    if (!images?.length) {
      return FALLBACK_IMAGES.slice(0, count);
    }

    return images.slice(0, count);
  } catch (error) {
    console.error("[GET_PEXELS_IMAGES_ACTION]", error);
    return FALLBACK_IMAGES.slice(0, count);
  }
}