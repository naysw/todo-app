import {
  CreateTodoInput,
  CreateTodoOutput,
  DeleteTodoOutput,
  Todo,
  UpdateTodoInput,
  UpdateTodoOutput,
} from "@/types/todo";

/**
 * fetches all todos
 *
 * @returns Promise<Todo[]>
 */
export const getTodos = async (): Promise<Todo[]> => {
  const res = await fetch("/api/todos");
  const data = await res.json();
  return data?.data as Todo[];
};

/**
 * create todo api
 *
 * @param input CreateTodoInput
 * @returns Promise<CreateTodoOutput>
 */
export const createTodo = async (
  input: CreateTodoInput
): Promise<CreateTodoOutput> => {
  const res = await fetch("/api/todos", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(input),
  });
  const data = await res.json();
  return data;
};

/**
 * update todo api return created todo id
 *
 * @param input UpdateTodoInput
 * @returns  Promise<UpdateTodoOutput>
 */
export const updateTodo = async ({
  id,
  todo,
  isCompleted,
}: UpdateTodoInput): Promise<UpdateTodoOutput> => {
  const res = await fetch(`/api/todos/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ todo, isCompleted }),
  });
  const data = await res.json();
  return data;
};

/**
 * delete todo api
 *
 * @param id string
 * @returns Promise<DeleteTodoOutput>
 */
export const deleteTodo = async (id: string): Promise<DeleteTodoOutput> => {
  const res = await fetch(`/api/todos/${id}`, {
    method: "DELETE",
  });
  const data = await res.json();
  return data;
};
