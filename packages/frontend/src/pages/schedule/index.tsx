import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin, { DateClickArg } from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";
import jaLocale from "@fullcalendar/core/locales/ja";

const ScheduleCalendar = () => {
  const onEventClick = (dataClickInfo: DateClickArg) => {
    console.log(dataClickInfo.dateStr);
  };

  return (
    <>
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin, listPlugin]}
        headerToolbar={{
          left: "prev,next today",
          center: "title",
          right: "dayGridMonth,timeGridWeek listWeek",
        }}
        initialView="dayGridMonth"
        selectable={true}
        editable={true}
        dateClick={onEventClick}
        locales={[jaLocale]}
        locale="ja"
      />
    </>
  );
};

export default ScheduleCalendar;
