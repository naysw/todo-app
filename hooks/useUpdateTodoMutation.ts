import { updateTodo } from "@/api/todos";
import { UpdateTodoInput, Todo } from "@/types/todo";
import useSWRMutation from "swr/mutation";

export const useUpdateTodoMutation = () => {
  let a: UpdateTodoInput | undefined;
  return useSWRMutation<any, any, string, UpdateTodoInput>(
    "/api/todos",
    (_, { arg }) => {
      a = arg;
      return updateTodo(arg);
    },
    {
      optimisticData(currentData: Todo[] | undefined) {
        if (!currentData) return;
        return currentData.map((todo) => {
          if (todo.id !== a?.id) {
            return todo;
          }

          return {
            ...todo,
            ...a,
          };
        });
      },
    }
  );
};
