import { useCreateUserMutation } from "@/features/user/hooks/mutate";

export const useCreateUser = () => {
  const { mutateAsync: createUser, error } = useCreateUserMutation();

  if (error) {
    throw error;
  }

  return { createUser };
};
