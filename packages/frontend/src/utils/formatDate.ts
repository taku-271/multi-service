import dayjs from "dayjs";

export const formatYearMonthDate = (date: Date) => {
  return dayjs(date).format("YYYY/MM/DD");
};

export const formatYearMonthDateHourMinute = (date: Date) => {
  return dayjs(date).format("YYYY/MM/DD HH:mm");
};

export const formatYearMonthDateForEvents = (date: Date) => {
  return dayjs(date).format("YYYY-MM-DD");
};
