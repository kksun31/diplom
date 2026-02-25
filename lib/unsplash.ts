// lib/pexels.ts
import "server-only";

type PexelsPhoto = {
  id: number;
  url: string;
  photographer: string;
  src: {
    tiny: string;
    small: string;
    medium: string;
    large: string;
    large2x: string;
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
  "portrait",
  "face",
  "human",
  "girl",
  "boy",
  "model",
];

const SAFE_QUERIES = [
  "abstract texture",
  "minimal background",
  "nature landscape",
  "mountains",
  "forest",
  "ocean",
  "architecture exterior",
  "geometric pattern",
  "space stars",
];

function hasPeople(alt?: string) {
  if (!alt) return false;
  const text = alt.toLowerCase();
  return FORBIDDEN_WORDS.some((w) => text.includes(w));
}

export async function getPexelsImages(count = 9): Promise<PexelsImage[]> {
  const apiKey = process.env.PEXELS_API_KEY;
  if (!apiKey) {
    throw new Error("PEXELS_API_KEY is missing");
  }

  const query =
    SAFE_QUERIES[Math.floor(Math.random() * SAFE_QUERIES.length)];

  const url = new URL("https://api.pexels.com/v1/search");
  url.searchParams.set("query", query);
  url.searchParams.set("per_page", "80");

  const res = await fetch(url.toString(), {
    headers: {
      Authorization: apiKey,
    },
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch images from Pexels");
  }

  const data = (await res.json()) as { photos: PexelsPhoto[] };

  const filtered = data.photos.filter((p) => !hasPeople(p.alt));

  return filtered.slice(0, count).map((photo) => ({
    id: String(photo.id),
    thumbUrl: photo.src.small,
    fullUrl: photo.src.large2x,
    linkHTML: photo.url,
    userName: photo.photographer,
  }));
}
