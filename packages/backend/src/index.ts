import express from "express";
import cors from "cors";
import { getSchedules } from "@/services/schedule";

const app = express();
const PORT = 3001;

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
    optionsSuccessStatus: 200,
  })
);
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/api/schedules", async (req, res) => {
  const result = await getSchedules();

  res.json(result);
});

app.listen(PORT, () => {
  console.log(`Server is running at https://localhost:${PORT}`);
});
