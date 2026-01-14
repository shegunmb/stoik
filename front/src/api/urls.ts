import type { Url } from "../types/url";

export async function fetchUrls(): Promise<Url[]> {
  const res = await fetch("/api/urls");
  if (!res.ok) throw new Error("Network error");
  return res.json();
}

export async function createShortUrl(originalUrl: string) {
  const res = await fetch("/api/urls", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ originalUrl }),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(text);
  }

  return res.json();
}
