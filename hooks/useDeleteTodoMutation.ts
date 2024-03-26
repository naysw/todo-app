import { deleteTodo } from "@/api/todos";
import { Todo } from "@/types/todo";
import useSWRMutation from "swr/mutation";

export const useDeleteTodoMutation = () => {
  let a: string | undefined;
  return useSWRMutation<any, any, string, string>(
    "/api/todos",
    (_, { arg }) => {
      a = arg;
      return deleteTodo(arg);
    },
    {
      optimisticData(currentData: Todo[] | undefined) {
        if (!currentData) return;
        return currentData.filter((todo) => todo.id !== a);
      },
    }
  );
};
