"use client";

import React from "react";
import { useGetListTodosQuery } from "@/hooks/useGetListTodosQuery";
import { useUpdateTodoMutation } from "@/hooks/useUpdateTodoMutation";
import { useDeleteTodoMutation } from "@/hooks/useDeleteTodoMutation";
import TodoList from "../TodoList";

const TodoListContainer = () => {
  const { isLoading, error, data } = useGetListTodosQuery();
  const { trigger: updateTrigger } = useUpdateTodoMutation();
  const { trigger: deleteTrigger } = useDeleteTodoMutation();

  const handleToggleItem = (id: string, isCompleted: boolean) => {
    updateTrigger(
      { id, isCompleted },
      {
        onSuccess: (data) => {
          console.log("Success", data);
        },
        onError: (error) => {
          console.log("Error", error);
        },
      }
    );
  };

  const handleDeleteItem = (id: string) => {
    deleteTrigger(id, {
      onSuccess: (data) => {
        console.log("Success", data);
      },
      onError: (error) => {
        console.log("Error", error);
      },
    });
  };

  return (
    <TodoList
      isLoading={isLoading}
      error={error}
      data={data}
      handleToggleItem={handleToggleItem}
      handleDeleteItem={handleDeleteItem}
    />
  );
};

export default TodoListContainer;
