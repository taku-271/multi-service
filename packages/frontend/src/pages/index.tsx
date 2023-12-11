import {
  useCreateSchedule,
  useDeleteSchedule,
  useUpdateSchedule,
  useGetSchedules,
} from "@/schedule/hooks/store";
import { createScheduleType, updateScheduleType } from "@/types/types";
import { formatYearMonthDate } from "@/utils/formatDate";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Input,
  TextField,
} from "@mui/material";
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
  const { deleteSchedule } = useDeleteSchedule();
  const [schedule, setSchedule] = useState<createScheduleType>(initSchedule);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState<boolean>(false);

  const onOpenDeleteDialog = () => {
    setIsDeleteDialogOpen(true);
  };
  const onCloseDeleteDialog = () => {
    setIsDeleteDialogOpen(false);
  };

  const onCreateSchedule = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (schedule.title === "" || schedule.description === "") {
      alert("タイトルと説明は必須です");
      return;
    }

    setSchedule({ ...schedule, start: new Date(schedule.start) });
    setSchedule({ ...schedule, end: new Date(schedule.start) });

    createSchedule(schedule);
    setSchedule(initSchedule);
  };

  const onDeleteSchedule = (id: number) => {
    deleteSchedule(id);
  };

  const onChangeSchedule = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setSchedule({ ...schedule, [e.target.id]: e.target.value });
  };

  return (
    <Box sx={{ m: 6 }}>
      <Box>
        <h1>スケジュール登録</h1>
        <form onSubmit={(e) => onCreateSchedule(e)}>
          <Box
            sx={{
              my: 2,
              display: "flex",
              alignItems: "center",
            }}
          >
            <label
              htmlFor="title"
              style={{ width: "10%", display: "inline-block" }}
            >
              タイトル
            </label>
            <TextField
              type="text"
              id="title"
              sx={{ ml: 6 }}
              onChange={(e) => onChangeSchedule(e)}
              value={schedule.title}
              variant="outlined"
              size="small"
            />
          </Box>
          <Box
            sx={{
              my: 2,
              display: "flex",
              alignItems: "center",
            }}
          >
            <label
              htmlFor="description"
              style={{ width: "10%", display: "inline-block" }}
            >
              説明
            </label>
            <TextField
              type="text"
              id="description"
              sx={{ ml: 6 }}
              onChange={(e) => onChangeSchedule(e)}
              value={schedule.description}
              size="small"
            />
          </Box>
          <Box sx={{ my: 2 }}>
            <label
              htmlFor="start"
              style={{ width: "10%", display: "inline-block" }}
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
              style={{ width: "10%", display: "inline-block" }}
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
            <Box
              key={schedule.id}
              sx={{
                border: "1px solid #bbb",
                px: 4,
                py: 2,
                my: 2,
                width: "50%",
              }}
            >
              <h2>{schedule.title}</h2>
              <p>{schedule.description}</p>
              <p>
                {formatYearMonthDate(schedule.start)}～
                {formatYearMonthDate(schedule.end)}
              </p>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <Button
                  variant="contained"
                  color="error"
                  onClick={onOpenDeleteDialog}
                >
                  削除
                </Button>
              </Box>
              <Dialog
                open={isDeleteDialogOpen}
                onClose={onCloseDeleteDialog}
                fullWidth
              >
                <DialogTitle>本当に削除しますか？</DialogTitle>
                <DialogContent>
                  <h4>{schedule.title}</h4>
                  <p>{schedule.description}</p>
                  <p>
                    {formatYearMonthDate(schedule.start)}～
                    {formatYearMonthDate(schedule.end)}
                  </p>
                </DialogContent>
                <DialogActions>
                  <Button onClick={onCloseDeleteDialog}>キャンセル</Button>
                  <Button
                    onClick={() => {
                      onDeleteSchedule(schedule.id);
                      onCloseDeleteDialog();
                    }}
                    color="error"
                  >
                    削除
                  </Button>
                </DialogActions>
              </Dialog>
            </Box>
          ))
        )}
      </Box>
    </Box>
  );
};

export default Index;
