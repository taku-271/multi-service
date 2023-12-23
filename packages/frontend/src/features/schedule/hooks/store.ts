import {
  useGetSchedulesByDateQuery,
  useGetSchedulesQuery,
} from "@/features/schedule/hooks/query";
import {
  useCreateScheduleMutation,
  useDeleteScheduleMutation,
  useUpdateScheduleMutation,
} from "@/features/schedule/hooks/mutate";
import { formatYearMonthDateForEvents } from "@/utils/formatDate";

export const useGetSchedules = () => {
  const { data, isLoading, error } = useGetSchedulesQuery();

  if (error) {
    throw error;
  }

  const schedules = data?.map((schedule) => {
    return {
      id: String(schedule.id),
      title: schedule.title,
      description: schedule.description,
      start: schedule.isAllDay
        ? formatYearMonthDateForEvents(schedule.start)
        : schedule.start,
      end: schedule.isAllDay
        ? formatYearMonthDateForEvents(schedule.end)
        : schedule.end,
    };
  });

  return { schedules, isGetSchedulesLoading: isLoading };
};

export const useGetSchedulesByDate = (date: Date) => {
  const { data, isLoading, error } = useGetSchedulesByDateQuery(date);

  if (error) {
    throw error;
  }

  return { schedules: data, isGetScheduleByDateLoading: isLoading };
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
