import { TodoRepository } from "@/domain/todo-repo";
import { Todo } from "@/types/todo";

interface GetListInput {
  todo?: string;
  isCompleted?: boolean;
}

interface CreateTodoInput extends Pick<Todo, "todo"> {}

interface UpdateTodoInput extends Pick<Todo, "id"> {
  todo?: string;
  isCompleted?: boolean;
}

interface DeleteTodoInput extends Pick<Todo, "id"> {}

export class TodoService {
  constructor(private readonly todoRepo: TodoRepository) {}

  /**
   * get list of todos
   *
   * @returns Promise<Todo[]>
   */
  async GetList(input?: GetListInput): Promise<Todo[]> {
    return await this.todoRepo.GetList({
      todo: input?.todo,
      isCompleted: input?.isCompleted,
    });
  }

  /**
   * create a new todo
   *
   * @param input CreateTodoInput
   * @returns Promise<string>
   */
  async Create(input: CreateTodoInput): Promise<string> {
    return await this.todoRepo.Create(input);
  }

  /**
   * update a todo
   *
   * @param input UpdateTodoInput
   * @returns Promise<void>
   */
  async Update(input: UpdateTodoInput): Promise<void> {
    await this.todoRepo.Update(input);
  }

  /**
   * delete a todo
   *
   * @param input DeleteTodoInput
   * @returns Promise<void>
   */
  async Delete(input: DeleteTodoInput): Promise<void> {
    await this.todoRepo.Delete(input);
  }
}
