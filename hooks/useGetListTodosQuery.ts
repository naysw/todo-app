import { Todo } from "@/types/todo";
import { getTodos } from "@/api/todos";
import useSWR from "swr";

const toSorted = (data: Todo[]) => {
  return data.sort(
    (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
  );
};

export const useGetListTodosQuery = () =>
  useSWR<Todo[]>("/api/todos", getTodos, {
    onSuccess: (data) => toSorted(data),
  });
