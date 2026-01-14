import express, { type Express } from "express";
import cors from "cors";
import { db } from "./db/index.js";
import { urls } from "./db/schema.js";
import { eq, sql } from "drizzle-orm";
import urlsRoutes from "./routes/urls.js";

const app: Express = express();

const PORT = 3001;
const ENV = "localhost";

app.use(cors({ origin: `http://${ENV}:5173`, credentials: true }));
app.use(express.json());

app.use("/api/urls", urlsRoutes);

app.get("/:shortCode", async (req, res) => {
  const result = await db
    .select()
    .from(urls)
    .where(eq(urls.shortCode, req.params.shortCode))
    .execute();

  if (result.length === 0) {
    return res.status(404).json({ error: "Not found" });
  }

  await db
    .update(urls)
    .set({ clickCount: sql`${urls.clickCount} + 1` })
    .where(eq(urls.shortCode, req.params.shortCode));

  res.redirect(302, result[0]!.originalUrl);
});

if (process.env.NODE_ENV !== "test") {
  app.listen(PORT, () => {
    console.log(`Server running on http://${ENV}:${PORT}`);
  });
}

export default app;
