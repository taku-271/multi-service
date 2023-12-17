import { createScheduleType, updateScheduleType } from "@/types/types";
import axios from "axios";
import { useMutation, useQueryClient } from "react-query";

export const useCreateScheduleMutation = () => {
  const queryClient = useQueryClient();

  return useMutation<unknown, unknown, createScheduleType>({
    mutationKey: ["createSchedule"],
    onSuccess: () => {
      queryClient.refetchQueries(["getSchedules"]);
      queryClient.refetchQueries(["getScheduleByDate"]);
    },
    mutationFn: async (newSchedule) => {
      return await axios.post(
        "http://localhost:3001/api/schedule/create",
        newSchedule
      );
    },
  });
};

export const useDeleteScheduleMutation = () => {
  const queryClient = useQueryClient();

  return useMutation<unknown, unknown, number>({
    mutationKey: ["deleteSchedule"],
    onSuccess: () => {
      queryClient.refetchQueries(["getSchedules"]);
      queryClient.refetchQueries(["getScheduleByDate"]);
    },
    mutationFn: async (id: number) => {
      return await axios.delete(
        `http://localhost:3001/api/schedule/delete/${id}`
      );
    },
  });
};

export const useUpdateScheduleMutation = () => {
  const queryClient = useQueryClient();

  return useMutation<unknown, unknown, { data: updateScheduleType }>({
    mutationKey: ["updateSchedule"],
    onSuccess: () => {
      queryClient.refetchQueries(["getSchedules"]);
    },
    mutationFn: async ({ data }) => {
      return await axios.put(
        `http://localhost:3001/api/schedule/edit/${data.id}`,
        data
      );
    },
  });
};
