"use client";

import React from "react";
import TodoForm from "../TodoCreateForm";
import TodoItem from "../TodoItem/TodoItem";
import { Todo } from "@/types/todo";

interface Props {
  isLoading: boolean;
  error: any;
  data: Todo[] | undefined;
  handleToggleItem: (id: string, isCompleted: boolean) => void;
  handleDeleteItem: (id: string) => void;
}

const TodoList: React.FC<Props> = ({
  isLoading,
  error,
  data,
  handleToggleItem,
  handleDeleteItem,
}) => {
  const [search, setSearch] = React.useState<string>("");

  const handleSearch = (value: string) => {
    setSearch(value);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const filteredTodos = data
    ? data.filter((item) =>
        search ? item.todo.toLowerCase().includes(search.toLowerCase()) : true
      )
    : [];

  return (
    <div className="max-w-xl mx-auto px-4 py-8">
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-4">Add Todo</h2>
        <TodoForm />
      </div>
      <div className="space-y-4">
        <h2 className="text-lg font-bold">Todo List</h2>

        <div>
          <div className="mb-4">
            <input
              type="search"
              placeholder="Search Todo"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
              value={search}
              onChange={(e) => handleSearch(e.target.value)}
            />
          </div>

          {filteredTodos.length ? (
            <div className="flex flex-col space-y-4">
              {filteredTodos.map(({ id, todo, isCompleted, createdAt }) => (
                <TodoItem
                  key={id}
                  id={id}
                  todo={todo}
                  isCompleted={isCompleted}
                  createdAt={createdAt}
                  onToggle={() => handleToggleItem(id, !isCompleted)}
                  onDelete={() => handleDeleteItem(id)}
                />
              ))}
            </div>
          ) : (
            <div className="text-center text-gray-400">
              No result. Create a new one instead!”
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TodoList;
