import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin, { DateClickArg } from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";
import jaLocale from "@fullcalendar/core/locales/ja";
import { ScheduleDetailDialog } from "@/features/schedule/components/ScheduleDetailDialog";
import { useState } from "react";
import { useGetSchedules } from "@/features/schedule/hooks/store";
import { Box, Button, CircularProgress } from "@mui/material";
import { useRouter } from "next/router";

const ScheduleCalendar = () => {
  const [isDetailDialogOpen, setIsDetailDialogOpen] = useState<boolean>(false);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const { schedules, isGetSchedulesLoading } = useGetSchedules();
  const { push } = useRouter();

  const onEventClick = (dataClickInfo: DateClickArg) => {
    setSelectedDate(dataClickInfo.date);
    setIsDetailDialogOpen(true);
  };

  const onCloseDetailDialog = () => {
    setIsDetailDialogOpen(false);
  };

  return (
    <Box sx={{ px: "10%" }}>
      <Box sx={{ m: 2 }}>
        <Button variant="contained" onClick={() => push("/")}>
          トップへ
        </Button>
      </Box>
      {isGetSchedulesLoading ? (
        <CircularProgress />
      ) : (
        <Box
          sx={{
            "& .fc .fc-scrollgrid-sync-inner": {
              "&:has(.fc-col-header-cell-cushion)": {
                background: "#65BBE9",
              },
            },
            "& .fc-daygrid-day-frame.fc-scrollgrid-sync-inner": {
              background: "#fff",
            },
          }}
        >
          <FullCalendar
            plugins={[
              dayGridPlugin,
              timeGridPlugin,
              interactionPlugin,
              listPlugin,
            ]}
            headerToolbar={{
              left: "prev,next today",
              center: "title",
              right: "dayGridMonth listWeek",
            }}
            initialView="dayGridMonth"
            events={schedules}
            selectable={true}
            editable={true}
            dateClick={onEventClick}
            locales={[jaLocale]}
            locale="ja"
            height="90vh"
          />
          <ScheduleDetailDialog
            selectedDate={selectedDate}
            isDetailDialogOpen={isDetailDialogOpen}
            onCloseDetailDialog={onCloseDetailDialog}
          />
        </Box>
      )}
    </Box>
  );
};

export default ScheduleCalendar;
