import {
  TodoRepository,
  CreateTodoInput,
  UpdateTodoInput,
  DeleteTodoInput,
  GetListTodoInput,
} from "@/domain/todo-repo";
import { Todo } from "@/types/todo";
import {
  collection,
  Firestore,
  getDocs,
  addDoc,
  updateDoc,
  doc,
  deleteDoc,
  Query,
  where,
  DocumentData,
} from "firebase/firestore";

export class TodoFirebase implements TodoRepository {
  constructor(private readonly storage: Firestore) {}

  /**
   *  get list of todos from firebase
   *
   * @param input
   * @returns
   */
  async GetList(input: GetListTodoInput): Promise<Todo[]> {
    const todos: Todo[] = [];
    const todosCollectionRef = collection(this.storage, "todos");
    let query: Query<DocumentData> = todosCollectionRef;

    if (input.todo) {
      where("todo", "==", input.todo);
    }

    if (input.isCompleted) {
      where("isCompleted", "==", input.isCompleted);
    }

    const querySnapshot = await getDocs(query);
    querySnapshot.forEach((doc) => {
      const d = doc.data();

      todos.push({
        id: doc.id,
        todo: d.todo,
        isCompleted: d.isCompleted,
        createdAt: d.createdAt?.toDate(),
      });
    });

    return todos;
  }

  /**
   * create a new todo
   *
   * @param input CreateTodoInput
   * @returns Promise<string>
   */
  async Create(input: CreateTodoInput): Promise<string> {
    const docRef = await addDoc(collection(this.storage, "todos"), {
      todo: input.todo,
      createdAt: new Date(),
    });

    return docRef.id;
  }

  /**
   * update a todo
   *
   * @param input UpdateTodoInput
   * @returns Promise<void>
   */
  async Update(input: UpdateTodoInput): Promise<void> {
    const updateFields: { [key: string]: any } = {};
    input?.todo !== undefined && (updateFields.todo = input.todo);
    input?.isCompleted !== undefined &&
      (updateFields.isCompleted = input.isCompleted);

    if (Object.keys(updateFields).length === 0) {
      return;
    }

    await updateDoc(doc(this.storage, "todos", input.id), updateFields);
  }

  /**
   * delete a todo
   *
   * @param input DeleteTodoInput
   * @returns Promise<void>
   */
  async Delete(input: DeleteTodoInput): Promise<void> {
    await deleteDoc(doc(this.storage, "todos", input.id));
  }
}
