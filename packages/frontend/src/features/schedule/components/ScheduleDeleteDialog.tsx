import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from "@mui/material";
import { useDeleteSchedule } from "@/features/schedule/hooks/store";

type ScheduleDeleteDialogProps = {
  isDeleteDialogOpen: boolean;
  selectedScheduleId: number;
  onCloseDeleteDialog: () => void;
};

export const ScheduleDeleteDialog = ({
  isDeleteDialogOpen,
  selectedScheduleId,
  onCloseDeleteDialog,
}: ScheduleDeleteDialogProps) => {
  const { deleteSchedule } = useDeleteSchedule();

  const onDeleteSchedule = () => {
    deleteSchedule(selectedScheduleId);
    onCloseDeleteDialog();
  };

  return (
    <Dialog open={isDeleteDialogOpen} onClose={onCloseDeleteDialog}>
      <DialogTitle>削除</DialogTitle>
      <DialogContent>
        <Typography>本当に削除しますか？</Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={onCloseDeleteDialog}>いいえ</Button>
        <Button onClick={onDeleteSchedule} color="error">
          はい
        </Button>
      </DialogActions>
    </Dialog>
  );
};
