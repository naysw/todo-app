import { storage } from "@/libs/firebase";
import { TodoFirebase } from "@/persistence/firebase/todo";
import { TodoService } from "@/services/todo-service";
import * as Yup from "yup";

/**
 * validate update todo body
 *
 * @param body
 * @returns Promise<FieldError[]>
 */
async function validateUpdateTodoBody(body: any): Promise<FieldError[]> {
  const fes: FieldError[] = [];
  const schema = Yup.object().shape({
    todo: Yup.string().nullable().max(200).trim(),
    isCompleted: Yup.boolean().nullable(),
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
 * @param ctx NextContext
 * @returns
 */
export const PUT = async (req: Request, ctx?: any) => {
  const body = await req.json();
  const id = ctx?.params?.id;

  if (!id) {
    return Response.json(
      {
        message: "Todo id is required.",
      },
      {
        status: 422,
      }
    );
  }

  const fes = await validateUpdateTodoBody(body);
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
  await todoService.Update({
    id,
    todo: body.todo,
    isCompleted: body.isCompleted,
  });

  return Response.json({
    message: "Todo updated successfully.",
  });
};

/**
 * delete todo handler
 *
 * @param req Request
 * @param ctx NextContext
 * @returns
 */
export const DELETE = async (req: Request, ctx?: any) => {
  const id = ctx?.params?.id;

  if (!id) {
    return Response.json(
      {
        message: "Todo id is required.",
      },
      {
        status: 422,
      }
    );
  }

  const todoService = new TodoService(new TodoFirebase(storage));
  await todoService.Delete({ id });

  return Response.json({
    message: "Todo deleted successfully.",
  });
};
