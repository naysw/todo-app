import { TodoFirebase } from "@/persistence/firebase/todo";
import { TodoService } from "@/services/todo-service";
import { storage } from "@/libs/firebase";
import * as Yup from "yup";

/**
 * get list of todos api handler
 *
 * @returns
 */
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const q = searchParams.get("q");
  const queryIsCompleted = searchParams.get("isCompleted");

  const todoService = new TodoService(new TodoFirebase(storage));

  const todos = await todoService.GetList({
    todo: q ?? undefined,
    isCompleted: queryIsCompleted === "true",
  });

  return Response.json({
    data: todos,
  });
}

/**
 * validate create todo body
 *
 * @param body
 * @returns Promise<FieldError[]>
 */
async function validateCreateTodoBody(body: any): Promise<FieldError[]> {
  const fes: FieldError[] = [];

  const schema = Yup.object().shape({
    todo: Yup.string().required().max(200).trim(),
  });

  try {
    await schema.validate(body, {
      abortEarly: false,
    });
  } catch (err) {
    if (err instanceof Yup.ValidationError) {
      err.inner.forEach((e) => {
        fes.push({
          field: e.path ?? "",
          resource: e.message,
          code: e.type ?? "required",
        });
      });
    }
  }

  return fes;
}

/**
 * update todo handler
 *
 * @param req Request
 * @returns
 */
export async function POST(req: Request) {
  const body = await req.json();

  const fes = await validateCreateTodoBody(body);
  if (fes.length > 0) {
    return Response.json(
      {
        errors: fes,
      },
      {
        status: 422,
      }
    );
  }

  const todoService = new TodoService(new TodoFirebase(storage));
  const id = await todoService.Create({
    todo: body.todo,
  });

  return Response.json(
    {
      data: {
        id,
      },
    },
    {
      status: 201,
    }
  );
}
