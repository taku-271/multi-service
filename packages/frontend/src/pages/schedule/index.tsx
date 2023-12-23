import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin, { DateClickArg } from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";
import jaLocale from "@fullcalendar/core/locales/ja";
import { ScheduleDetailDialog } from "@/features/schedule/components/ScheduleDetailDialog";
import { useEffect, useState } from "react";
import { useGetSchedules } from "@/features/schedule/hooks/store";
import { formatYearMonthDateForEvents } from "@/utils/formatDate";
import { eventScheduleType } from "@/types/types";
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
    <>
      <Box sx={{ m: 2 }}>
        <Button variant="contained" onClick={() => push("/")}>
          トップへ
        </Button>
      </Box>
      {isGetSchedulesLoading ? (
        <CircularProgress />
      ) : (
        <>
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
          />
          <ScheduleDetailDialog
            selectedDate={selectedDate}
            isDetailDialogOpen={isDetailDialogOpen}
            onCloseDetailDialog={onCloseDetailDialog}
          />
        </>
      )}
    </>
  );
};

export default ScheduleCalendar;
