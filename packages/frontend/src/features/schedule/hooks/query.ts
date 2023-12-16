import axios from "axios";
import { useQuery } from "react-query";
import { ScheduleType } from "@/types/types";

export const useGetSchedulesQuery = () => {
  return useQuery({
    queryKey: "getSchedules",
    queryFn: async () => {
      const { data } = await axios.get<ScheduleType[]>(
        "http://localhost:3001/api/schedules"
      );

      return data;
    },
    cacheTime: 0,
  });
};

export const useGetSchedulesByDateQuery = (date: Date) => {
  return useQuery({
    queryKey: ["getScheduleByDate", date],
    queryFn: async () => {
      const { data } = await axios.get<ScheduleType[]>(
        `http://localhost:3001/api/schedules/${date}`
      );

      return data;
    },
    cacheTime: 0,
  });
};
