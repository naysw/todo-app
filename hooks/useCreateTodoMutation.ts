import { createTodo } from "@/api/todos";
import { CreateTodoInput, Todo } from "@/types/todo";
import useSWRMutation from "swr/mutation";

export const useCreateTodoMutation = () => {
  let a: CreateTodoInput | undefined;
  return useSWRMutation<any, any, string, CreateTodoInput>(
    "/api/todos",
    (_, { arg }) => {
      a = arg;
      return createTodo(arg);
    },
    {
      optimisticData(currentData: Todo[] | undefined) {
        if (!currentData) return;

        return [
          ...currentData,
          {
            id: "temp-id",
            todo: a?.todo,
            createdAt: new Date().toISOString(),
          },
        ];
      },
      rollbackOnError: true,
    }
  );
};
