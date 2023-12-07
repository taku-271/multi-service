import { useGetSchedulesQuery } from "@/hooks/query";

export const useGetSchedules = () => {
  const { data, isLoading, error } = useGetSchedulesQuery();

  if (error) {
    throw error;
  }

  return { schedules: data, isGetSchedulesLoading: isLoading };
};
