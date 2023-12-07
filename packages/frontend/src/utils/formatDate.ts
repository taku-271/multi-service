import dayjs from "dayjs";

export const formatYearMonthDate = (date: string) => {
  return dayjs(date).format("YYYY/MM/DD");
};
