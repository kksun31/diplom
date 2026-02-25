"use server";
import { getPexelsImages as getImages } from "@/lib/pexels";

export const getImage = async (count: number) => {
  return await getImages(count);
};
type PexelsPhoto = {
  id: number;
  url: string;
  photographer: string;
  src: {
    original?: string;
    large2x?: string;
    large?: string;
    medium?: string;
    small?: string;
    tiny?: string;
  };
  alt?: string;
};

export type PexelsImage = {
  id: string;
  thumbUrl: string;
  fullUrl: string;
  linkHTML: string;
  userName: string;
};

const FORBIDDEN_WORDS = [
  "person",
  "people",
  "man",
  "woman",
  "men",
  "women",
  "portrait",
  "face",
  "human",
  "girl",
  "boy",
  "model",
  "child",
  "children",
  "couple",
  "crowd",
  "wedding",
  "selfie",
];

const SAFE_RANDOM_QUERIES = [
  "abstract texture",
  "minimal background",
  "nature landscape",
  "mountains",
  "forest",
  "ocean",
  "desert",
  "space stars",
  "architecture exterior",
  "geometric pattern",
  "marble texture",
  "gradient background",
];

function looksLikePeople(alt?: string) {
  if (!alt) return false;
  const t = alt.toLowerCase();
  return FORBIDDEN_WORDS.some((w) => t.includes(w));
}

function toPexelsImage(photo: PexelsPhoto): PexelsImage {
  const thumb =
    photo.src.small || photo.src.medium || photo.src.tiny || photo.src.large || "";
  const full =
    photo.src.large2x || photo.src.original || photo.src.large || photo.src.medium || "";

  return {
    id: String(photo.id),
    thumbUrl: thumb,
    fullUrl: full,
    linkHTML: photo.url,
    userName: photo.photographer,
  };
}

function pickRandomQuery() {
  return SAFE_RANDOM_QUERIES[Math.floor(Math.random() * SAFE_RANDOM_QUERIES.length)];
}

async function pexelsFetch(endpoint: string, params: Record<string, string>) {
  const apiKey = process.env.PEXELS_API_KEY;
  if (!apiKey) throw new Error("PEXELS_API_KEY is missing in .env");

  const url = new URL(`https://api.pexels.com/v1/${endpoint}`);
  Object.entries(params).forEach(([k, v]) => url.searchParams.set(k, v));

  const res = await fetch(url.toString(), {
    headers: { Authorization: apiKey },
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error(`Pexels API error: ${res.status} ${res.statusText}`);
  }

  return (await res.json()) as { photos: PexelsPhoto[] };
}

/**
 * Рандомные картинки для выбора обложки.
 * Возвращает уже готовый массив PexelsImage[].
 */
export async function getPexelsImages(count = 9): Promise<PexelsImage[]> {
  const perPage = Math.min(Math.max(count * 6, 30), 80);
  const query = pickRandomQuery();

  const data = await pexelsFetch("search", {
    query,
    per_page: String(perPage),
    page: "1",
  });

  const filtered = (data.photos ?? []).filter((p) => !looksLikePeople(p.alt));
  return filtered.slice(0, count).map(toPexelsImage);
}