import { useGetSchedules } from "@/hooks/store";
import { formatYearMonthDate } from "@/utils/formatDate";
import { Box } from "@mui/material";

const Index = () => {
  const { schedules, isGetSchedulesLoading } = useGetSchedules();

  return (
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
  );
};

export default Index;
