export interface Todo {
  id: string;
  todo: string;
  isCompleted: boolean;
  createdAt: Date;
}

export interface CreateTodoInput extends Omit<Todo, "id" | "createdAt"> {}

export interface UpdateTodoInput {
  id: string;
  todo?: string;
  isCompleted?: boolean;
}

export interface CreateTodoOutput extends ServerResponse<Pick<Todo, "id">> {}
export interface UpdateTodoOutput extends ServerResponse<{}> {}
export interface DeleteTodoOutput extends ServerResponse<{}> {}

export interface ServerResponse<T> {
  data?: T;
  message: string;
}
