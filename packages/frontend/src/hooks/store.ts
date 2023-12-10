import { useGetSchedulesQuery } from "@/hooks/query";
import { useCreateScheduleMutation } from "@/hooks/mutate";

export const useGetSchedules = () => {
  const { data, isLoading, error } = useGetSchedulesQuery();

  if (error) {
    throw error;
  }

  return { schedules: data, isGetSchedulesLoading: isLoading };
};

export const useCreateSchedule = () => {
  const { mutateAsync: createSchedule, error } = useCreateScheduleMutation();

  if (error) {
    throw error;
  }

  return { createSchedule };
};
