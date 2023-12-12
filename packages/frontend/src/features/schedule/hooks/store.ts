import { useGetSchedulesQuery } from "@/features/schedule/hooks/query";
import {
  useCreateScheduleMutation,
  useDeleteScheduleMutation,
  useUpdateScheduleMutation,
} from "@/features/schedule/hooks/mutate";

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

export const useDeleteSchedule = () => {
  const { mutateAsync: deleteSchedule, error } = useDeleteScheduleMutation();

  if (error) {
    throw error;
  }

  return { deleteSchedule };
};

export const useUpdateSchedule = () => {
  const { mutateAsync: updateSchedule, error } = useUpdateScheduleMutation();

  if (error) {
    throw error;
  }

  return { updateSchedule };
};
