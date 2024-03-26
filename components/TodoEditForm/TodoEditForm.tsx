import { useForm } from "react-hook-form";
import React from "react";
import { useUpdateTodoMutation } from "@/hooks/useUpdateTodoMutation";

interface TodoEditFormProps {
  onSaved: () => void;
  onCancel: () => void;
  formValues: {
    id: string;
    todo: string;
  };
}

const TodoEditForm = ({
  onSaved,
  onCancel,
  formValues: defaultValues,
}: TodoEditFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues,
  });
  const { trigger } = useUpdateTodoMutation();

  /**
   * handle update todo
   *
   * @param param0 id and todo
   */
  const handleUpdateTodo = ({ id, todo }: { id: string; todo: string }) => {
    onSaved();
    trigger(
      { id, todo },
      {
        onSuccess: (data) => {
          console.log("Todo updated successfully");
        },
        onError: (error) => {
          console.log("Error", error);
        },
      }
    );
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit(handleUpdateTodo)}
        className="w-full flex items-center space-x-2"
      >
        <input
          type="text"
          {...register("todo", {
            required: "Please enter a todo",
            validate: (value) =>
              value.trim().length > 0 || "Todo cannot be empty",
          })}
          className="flex-grow px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
        />
        <div className="flex space-x-2">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 focus:outline-none focus:bg-gray-700"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:bg-indigo-700"
          >
            Save
          </button>
        </div>
      </form>

      {errors?.todo && (
        <span className="text-red-500 text-sm">{errors.todo.message}</span>
      )}
    </div>
  );
};

export default TodoEditForm;
