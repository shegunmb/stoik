import { Router } from "express";
import { db } from "../db/index.js";
import { urls } from "../db/schema.js";
import { eq } from "drizzle-orm";

const router: Router = Router();

router.post("/", async (req, res) => {
  const { shortCode, originalUrl } = req.body;

  if (!shortCode || !originalUrl) {
    return res.status(400).json({ error: "Missing fields" });
  }

  try {
    await db.insert(urls).values({ shortCode, originalUrl });
    res.status(201).json({ ok: true });
  } catch (err: any) {
    if (err.message.includes("unique")) {
      return res.status(409).json({ error: "Already exists" });
    }
    res.status(500).json({ error: "Database error" });
  }
});

router.get("/:shortCode", async (req, res) => {
  const result = await db
    .select()
    .from(urls)
    .where(eq(urls.shortCode, req.params.shortCode))
    .execute();

  if (!result) return res.status(404).json({ error: "Not found" });

  res.json(result);
});

export default router;
