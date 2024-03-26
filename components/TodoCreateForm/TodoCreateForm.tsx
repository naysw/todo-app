import { useCreateTodoMutation } from "@/hooks/useCreateTodoMutation";
import { useForm } from "react-hook-form";
import React from "react";

const TodoCreateForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      todo: "",
    },
  });
  const { trigger } = useCreateTodoMutation();

  /**
   * handle add todo
   *
   * @param data Todo data
   */
  const handleAddTodo = (data: any) => {
    trigger(data, {
      onSuccess: (data) => {
        reset();
      },
      onError: (error) => {
        console.log("Error", error);
      },
    });
  };

  return (
    <div>
      <form onSubmit={handleSubmit(handleAddTodo)} className="flex space-x-4">
        <input
          type="text"
          id="todo"
          placeholder="Enter a todo"
          {...register("todo", {
            required: "Please enter a todo",
            validate: (value) =>
              value.trim().length > 0 || "Todo cannot be empty",
          })}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
        />
        <button
          type="submit"
          className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:bg-indigo-700"
        >
          Add
        </button>
      </form>
      {errors?.todo && (
        <span className="text-red-500 text-sm">{errors.todo.message}</span>
      )}
    </div>
  );
};

export default TodoCreateForm;
