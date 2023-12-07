import axios from "axios";
import { useQuery } from "react-query";
import { Schedule } from "@/types/types";

export const useGetSchedulesQuery = () => {
  return useQuery({
    queryKey: "schedules",
    queryFn: async () => {
      const { data } = await axios.get<Schedule[]>(
        "http://localhost:3001/api/schedules"
      );

      return data;
    },
    cacheTime: 0,
  });
};
