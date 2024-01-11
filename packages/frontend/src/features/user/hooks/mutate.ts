import { createUserType } from "@/types/types";
import axios from "axios";
import { useMutation, useQueryClient } from "react-query";

export const useCreateUserMutation = () => {
  const queryClient = useQueryClient();

  return useMutation<unknown, unknown, createUserType>({
    mutationKey: ["createUser"],
    onSuccess: () => {},
    mutationFn: async (newUser) => {
      return await axios.post("http://localhost:3001/api/user/create", newUser);
    },
  });
};
