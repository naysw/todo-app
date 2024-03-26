import { Todo } from "@/types/todo";

export interface GetListTodoInput {
  todo?: Todo["todo"];
  isCompleted?: Todo["isCompleted"];
}

export interface CreateTodoInput extends Pick<Todo, "todo"> {
  isCompleted?: boolean;
}

export interface UpdateTodoInput extends Pick<Todo, "id"> {
  todo?: string;
  isCompleted?: boolean;
}

export interface DeleteTodoInput extends Pick<Todo, "id"> {}

export interface TodoRepository {
  GetList(input: GetListTodoInput): Promise<Todo[]>;
  Create(input: CreateTodoInput): Promise<string>;
  Update(input: UpdateTodoInput): Promise<void>;
  Delete(input: DeleteTodoInput): Promise<void>;
}
