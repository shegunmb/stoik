import { integer, pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";

export const urls = pgTable("urls", {
  id: serial("id").primaryKey(),
  shortCode: text("short_code").notNull().unique(),
  originalUrl: text("original_url").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
  clickCount: integer("click_count").default(0).notNull(),
});
