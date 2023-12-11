import { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

const ScheduleCalendar = () => {
  const [value, setValue] = useState<Date>();

  return (
    <>
      <Calendar value={value} onClickDay={(e) => setValue(e)} />
      <p>{value ? value.toString() : ""}</p>
    </>
  );
};

export default ScheduleCalendar;
