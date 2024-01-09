import express from "express";
import cors from "cors";
import {
  createSchedule,
  deleteSchedule,
  getSchedules,
  getSchedulesByDate,
  updateSchedule,
} from "@/services/schedule";
import { postSignIn } from "@/services/user";

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

app.get("/api/schedules/:date", async (req, res) => {
  const result = await getSchedulesByDate(new Date(req.params.date));

  res.json(result);
});

app.post("/api/schedule/create", async (req, res) => {
  const result = await createSchedule(req.body);

  res.json(result);
});

app.delete("/api/schedule/delete/:id", async (req, res) => {
  const id = req.params.id;
  const result = await deleteSchedule(Number(id));

  res.json(result);
});

app.post("/api/schedule/edit/:id", async (req, res) => {
  const data = req.body;
  const result = await updateSchedule(data);

  res.json(result);
});

app.post("/api/user/signin", async (req, res) => {
  const data = req.body;

  const result = await postSignIn(data);

  res.json(result);
});

app.listen(PORT, () => {
  console.log(`Server is running at https://localhost:${PORT}`);
});
