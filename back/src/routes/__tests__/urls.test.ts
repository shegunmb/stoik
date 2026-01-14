import request from "supertest";
import { describe, it, expect } from "vitest";
import app from "../../index.js";

describe("URL shortener API", () => {
  it("creates a short URL", async () => {
    const res = await request(app)
      .post("/api/urls")
      .send({ originalUrl: "https://example.com" });

    expect(res.status).toBe(201);
    expect(res.body.shortCode).toBeDefined();
  });

  it("redirects to the original URL", async () => {
    const create = await request(app)
      .post("/api/urls")
      .send({ originalUrl: "https://example.com" });

    const { shortCode } = create.body;

    const redirect = await request(app).get(`/${shortCode}`);

    expect(redirect.status).toBe(302);
    expect(redirect.headers.location).toBe("https://example.com");
  });
});
