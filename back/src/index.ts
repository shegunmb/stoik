import express from "express";
import cors from "cors";
import urlsRoutes from "./routes/urls.js";

const app = express();
const PORT = 3001;

app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json());

app.use("/urls", urlsRoutes);

app.get("/api/hello", (req, res) => {
  res.json({ message: "Hello from Express + PostgreSQL + Drizzle!" });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
