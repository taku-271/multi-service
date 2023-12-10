import { useCreateSchedule, useGetSchedules } from "@/hooks/store";
import { createScheduleType } from "@/types/types";
import { formatYearMonthDate } from "@/utils/formatDate";
import { Box, Button, Input } from "@mui/material";
import { useState } from "react";

const Index = () => {
  const initSchedule = {
    title: "",
    description: "",
    start: new Date(),
    end: new Date(),
  };
  const { schedules, isGetSchedulesLoading } = useGetSchedules();
  const { createSchedule } = useCreateSchedule();
  const [schedule, setSchedule] = useState<createScheduleType>(initSchedule);

  const onCreateSchedule = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (schedule.title === "" || schedule.description === "") {
      alert("タイトルと説明は必須です");
      return;
    }

    schedule.start = new Date(schedule.start);
    schedule.end = new Date(schedule.end);

    createSchedule(schedule);

    setSchedule(initSchedule);
  };

  const onChangeSchedule = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setSchedule({ ...schedule, [e.target.id]: e.target.value });
  };

  return (
    <>
      <Box>
        <h1>スケジュール登録</h1>
        <form onSubmit={(e) => onCreateSchedule(e)}>
          <Box sx={{ my: 2 }}>
            <label
              htmlFor="title"
              style={{ width: "5%", display: "inline-block" }}
            >
              タイトル
            </label>
            <Input
              type="text"
              id="title"
              sx={{ ml: 6 }}
              onChange={(e) => onChangeSchedule(e)}
              value={schedule.title}
            />
          </Box>
          <Box sx={{ my: 2 }}>
            <label
              htmlFor="description"
              style={{ width: "5%", display: "inline-block" }}
            >
              説明
            </label>
            <Input
              type="text"
              id="description"
              sx={{ ml: 6 }}
              onChange={(e) => onChangeSchedule(e)}
              value={schedule.description}
            />
          </Box>
          <Box sx={{ my: 2 }}>
            <label
              htmlFor="start"
              style={{ width: "5%", display: "inline-block" }}
            >
              開始日
            </label>
            <Input
              type="date"
              id="start"
              sx={{ ml: 6 }}
              onChange={(e) => onChangeSchedule(e)}
              value={schedule.start}
            />
          </Box>
          <Box sx={{ my: 2 }}>
            <label
              htmlFor="end"
              style={{ width: "5%", display: "inline-block" }}
            >
              終了日
            </label>
            <Input
              type="date"
              id="end"
              sx={{ ml: 6 }}
              onChange={(e) => onChangeSchedule(e)}
              value={schedule.end}
            />
          </Box>
          <Button variant="contained" type="submit">
            登録
          </Button>
        </form>
      </Box>
      <Box>
        <h1>スケジュール一覧</h1>
        {isGetSchedulesLoading ? (
          <p>読み込み中...</p>
        ) : (
          schedules?.map((schedule) => (
            <Box key={schedule.id}>
              <h2>{schedule.title}</h2>
              <p>{schedule.description}</p>
              <p>
                {formatYearMonthDate(schedule.start)}～
                {formatYearMonthDate(schedule.end)}
              </p>
            </Box>
          ))
        )}
      </Box>
    </>
  );
};

export default Index;
