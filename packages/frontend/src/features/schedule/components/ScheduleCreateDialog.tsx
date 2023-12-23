import { formatYearMonthDate } from "@/utils/formatDate";
import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  FormControl,
  FormLabel,
  Input,
  TextField,
  Typography,
} from "@mui/material";
import { ChangeEvent, FormEvent, useState } from "react";
import { useCreateSchedule } from "@/features/schedule/hooks/store";
import { createScheduleType } from "@/types/types";

type ScheduleCreateDialogProps = {
  isCreateDialogOpen: boolean;
  selectedDate: Date;
  onCloseCreateDialog: () => void;
};

export const ScheduleCreateDialog = ({
  isCreateDialogOpen,
  selectedDate,
  onCloseCreateDialog,
}: ScheduleCreateDialogProps) => {
  type ScheduleInfo = {
    title: string;
    description: string;
  };

  const initSchedule: ScheduleInfo = {
    title: "",
    description: "",
  };

  const { createSchedule } = useCreateSchedule();
  const [schedule, setSchedule] = useState<ScheduleInfo>(initSchedule);
  const [count, setCount] = useState<number>(0);

  const onChangeSchedule = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setSchedule({ ...schedule, [e.target.id]: e.target.value });
  };

  const onCreateScheduleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (schedule.title === "" || schedule.description === "") {
      alert("タイトルと説明は必須です");
      return;
    }

    createSchedule({
      ...schedule,
      start: selectedDate,
      end: selectedDate,
      isAllDay: true,
    });
    setSchedule(initSchedule);
    onCloseCreateDialog();
  };

  return (
    <Dialog open={isCreateDialogOpen} onClose={onCloseCreateDialog} fullWidth>
      <DialogTitle>
        <Typography variant="h5">
          {formatYearMonthDate(selectedDate)}
        </Typography>
      </DialogTitle>
      <DialogContent>
        <Typography variant="h6" sx={{ mb: 3 }}>
          スケジュール作成
        </Typography>
        <form onSubmit={(e) => onCreateScheduleSubmit(e)}>
          <FormControl color="primary" sx={{ width: "100%", mb: 3 }}>
            <FormLabel htmlFor="title">タイトル</FormLabel>
            <Input id="title" fullWidth onChange={(e) => onChangeSchedule(e)} />
          </FormControl>
          <FormControl color="primary" sx={{ width: "100%", mb: 3 }}>
            <FormLabel htmlFor="description">概要</FormLabel>
            <Input
              id="description"
              fullWidth
              onChange={(e) => onChangeSchedule(e)}
            />
          </FormControl>
          <Button type="submit" variant="contained" fullWidth>
            スケジュール登録
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};
