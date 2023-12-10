import { createScheduleType } from "@/types/types";
import axios from "axios";
import { useMutation, useQueryClient } from "react-query";

export const useCreateScheduleMutation = () => {
  const queryClient = useQueryClient();

  return useMutation<unknown, unknown, createScheduleType>({
    mutationKey: ["createSchedule"],
    onSuccess: () => {
      queryClient.invalidateQueries(["getSchedules"]);
    },
    mutationFn: async (newSchedule) => {
      return await axios.post(
        "http://localhost:3001/api/schedule/create",
        newSchedule
      );
    },
  });
};
