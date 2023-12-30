import {
  formatYearMonthDate,
  formatYearMonthDateHourMinute,
} from "@/utils/formatDate";
import {
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogContent,
  DialogTitle,
  Typography,
} from "@mui/material";
import { useGetSchedulesByDate } from "@/features/schedule/hooks/store";
import { useState } from "react";
import { ScheduleCreateDialog } from "@/features/schedule/components/ScheduleCreateDialog";
import { ScheduleDeleteDialog } from "@/features/schedule/components/ScheduleDeleteDialog";

type ScheduleDetailDialogProps = {
  selectedDate: Date;
  isDetailDialogOpen: boolean;
  onCloseDetailDialog: () => void;
};

export const ScheduleDetailDialog = ({
  selectedDate,
  isDetailDialogOpen,
  onCloseDetailDialog,
}: ScheduleDetailDialogProps) => {
  const { schedules, isGetScheduleByDateLoading } =
    useGetSchedulesByDate(selectedDate);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState<boolean>(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState<boolean>(false);
  const [selectedScheduleId, setSelectScheduleId] = useState<number>(-1);

  const onCreateScheduleHandle = () => {
    onCloseDetailDialog();
    setIsCreateDialogOpen(true);
  };
  const onCloseCreateDialog = () => {
    setIsCreateDialogOpen(false);
  };

  const onDeleteScheduleHandle = (id: number) => {
    setSelectScheduleId(id);
    setIsDeleteDialogOpen(true);
  };

  return (
    <>
      <Dialog open={isDetailDialogOpen} onClose={onCloseDetailDialog} fullWidth>
        <DialogTitle>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Typography variant="h5">
              {formatYearMonthDate(selectedDate)}
            </Typography>
            <Button variant="outlined" onClick={onCreateScheduleHandle}>
              +
            </Button>
          </Box>
        </DialogTitle>
        <DialogContent>
          {isGetScheduleByDateLoading ? (
            <CircularProgress />
          ) : (
            <>
              {schedules?.length ? (
                schedules.map((schedule) => {
                  return (
                    <Box
                      key={schedule.id}
                      sx={{ border: "1px solid #ccc", p: 2, mb: 2 }}
                    >
                      <h4>{schedule.title}</h4>
                      {schedule.description && (
                        <Typography>{schedule.description}</Typography>
                      )}
                      {!schedule.isAllDay && (
                        <>
                          <Typography>
                            開始日：
                            {formatYearMonthDateHourMinute(schedule.start)}
                          </Typography>
                          <Typography>
                            終了日：
                            {formatYearMonthDateHourMinute(schedule.end)}
                          </Typography>
                        </>
                      )}
                      <Box sx={{ display: "flex", justifyContent: "right" }}>
                        <Button
                          variant="outlined"
                          color="error"
                          onClick={() => onDeleteScheduleHandle(schedule.id)}
                        >
                          削除
                        </Button>
                      </Box>
                    </Box>
                  );
                })
              ) : (
                <Typography>表示する予定は存在しません。</Typography>
              )}
            </>
          )}
        </DialogContent>
      </Dialog>
      <ScheduleCreateDialog
        isCreateDialogOpen={isCreateDialogOpen}
        selectedDate={selectedDate}
        onCloseCreateDialog={onCloseCreateDialog}
      />
      <ScheduleDeleteDialog
        isDeleteDialogOpen={isDeleteDialogOpen}
        onCloseDeleteDialog={() => setIsDeleteDialogOpen(false)}
        selectedScheduleId={selectedScheduleId}
      />
    </>
  );
};
