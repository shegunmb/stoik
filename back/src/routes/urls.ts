import { Router } from "express";
import { db } from "../db/index.js";
import { urls } from "../db/schema.js";
import { eq, desc } from "drizzle-orm";

const ENV = "localhost";
const PORT = 3001;

export const generateShortCode = (): string => {
  return Math.random().toString(36).substring(2, 8);
};

const router: Router = Router();

const generateUniqueShortCode = async (): Promise<string> => {
  let shortCode = generateShortCode();
  let attempts = 0;
  const maxAttempts = 10;

  while (attempts < maxAttempts) {
    const existing = await db
      .select()
      .from(urls)
      .where(eq(urls.shortCode, shortCode))
      .execute();

    if (existing.length === 0) {
      return shortCode;
    }

    shortCode = generateShortCode();
    attempts++;
  }

  throw new Error("Could not generate unique shortCode");
};

router.post("/", async (req, res) => {
  const { originalUrl } = req.body;

  if (!originalUrl) {
    return res.status(400).json({ error: "Missing originalUrl" });
  }

  try {
    const shortCode = await generateUniqueShortCode();
    await db.insert(urls).values({ shortCode, originalUrl });

    const shortenedUrl = `http://${ENV}:${PORT}/${shortCode}`;
    res.status(201).json({ ok: true, shortCode, shortenedUrl, clickCount: 0 });
  } catch (err: any) {
    console.error("Error inserting URL:", err);
    if (err.message === "Could not generate unique shortCode") {
      return res
        .status(500)
        .json({ error: "Failed to generate unique shortCode" });
    }
    res.status(500).json({ error: "Database error" });
  }
});

router.get("/", async (req, res) => {
  try {
    const results = await db
      .select()
      .from(urls)
      .orderBy(desc(urls.createdAt))
      .limit(50)
      .execute();

    res.status(200).json(results);
  } catch (err: any) {
    console.error("Error fetching URLs:", err);
    res.status(500).json({ error: "Database error" });
  }
});

export default router;
