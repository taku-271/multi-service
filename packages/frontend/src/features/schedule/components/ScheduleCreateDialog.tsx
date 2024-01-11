import { formatYearMonthDate } from "@/utils/formatDate";
import {
  Box,
  Button,
  Checkbox,
  Dialog,
  DialogContent,
  DialogTitle,
  FormControl,
  FormLabel,
  Input,
  Typography,
} from "@mui/material";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useCreateSchedule } from "@/features/schedule/hooks/store";

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
    description?: string;
    start: Date;
    end: Date;
    isAllDay: boolean;
  };

  const initSchedule: ScheduleInfo = {
    title: "",
    description: "",
    start: selectedDate,
    end: selectedDate,
    isAllDay: false,
  };

  const { createSchedule } = useCreateSchedule();
  const [schedule, setSchedule] = useState<ScheduleInfo>(initSchedule);

  useEffect(() => {
    if (schedule.isAllDay) {
      setSchedule({ ...schedule, start: selectedDate, end: selectedDate });
    }
  }, [schedule.isAllDay, selectedDate]);

  const onChangeSchedule = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const nodeValue = e.target.attributes[2].nodeValue;

    switch (nodeValue) {
      case "datetime-local":
        setSchedule({ ...schedule, [e.target.id]: new Date(e.target.value) });
        return;
      case "checkbox":
        setSchedule({
          ...schedule,
          [e.target.id]: (e.target as HTMLInputElement).checked,
        });
        return;
      case "text":
        setSchedule({ ...schedule, [e.target.id]: e.target.value });
    }
  };

  const onCreateScheduleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (schedule.title === "") {
      alert("タイトルと説明は必須です");
      return;
    }

    createSchedule(schedule);
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
          <FormControl color="primary" sx={{ mb: 3 }}>
            <FormLabel htmlFor="isAllDay">終日</FormLabel>
            <Checkbox
              id="isAllDay"
              checked={schedule.isAllDay}
              onChange={(e) => onChangeSchedule(e)}
            />
          </FormControl>
          {!schedule.isAllDay && (
            <>
              <FormControl color="primary" sx={{ width: "100%", mb: 3 }}>
                <FormLabel htmlFor="start">開始日</FormLabel>
                <Input
                  type="datetime-local"
                  id="start"
                  fullWidth
                  onChange={(e) => onChangeSchedule(e)}
                />
              </FormControl>
              <FormControl color="primary" sx={{ width: "100%", mb: 3 }}>
                <FormLabel htmlFor="end">終了日</FormLabel>
                <Input
                  type="datetime-local"
                  id="end"
                  fullWidth
                  onChange={(e) => onChangeSchedule(e)}
                />
              </FormControl>
            </>
          )}
          <Button type="submit" variant="contained" fullWidth>
            スケジュール登録
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};
