import React, { useState } from "react";
import { Todo } from "@/types/todo";
import TodoEditForm from "../TodoEditForm";

interface TodoItemProps
  extends Pick<Todo, "todo" | "id" | "createdAt" | "isCompleted"> {
  onToggle?: (id: string) => void;
  onDelete?: (id: string) => void;
}

const TodoItem = ({
  id,
  todo,
  createdAt,
  isCompleted,
  onToggle,
  onDelete,
}: TodoItemProps) => {
  const [isEditing, setIsEditing] = useState(false);

  const handleToggle = () => {
    onToggle?.(id);
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  const handleDelete = () => {
    onDelete?.(id);
  };

  return (
    <div className="flex items-center justify-between border-b border-gray-200 py-4">
      {isEditing ? (
        <TodoEditForm
          onSaved={handleSave}
          onCancel={handleCancel}
          formValues={{ id, todo }}
        />
      ) : (
        <div className="flex items-center w-full">
          <div className="flex items-center justify-between w-full">
            <div className={isCompleted ? "line-through text-gray-500" : ""}>
              <p className="text-xl font-bold">{todo}</p>
              <p className="text-sm text-gray-600">{createdAt?.toString()}</p>
            </div>

            <div className="flex space-x-3 opacity-0 hover:opacity-100 transition-opacity">
              <button
                onClick={handleToggle}
                className={`text-sm px-2 py-1 border text-white ${
                  isCompleted
                    ? "bg-gray-600 hover:bg-gray-700"
                    : "bg-indigo-600 hover:bg-indigo-700"
                }`}
              >
                {isCompleted ? "Mark as Incomplete" : "Mark as Complete"}
              </button>
              <button
                onClick={handleEdit}
                className="focus:outline-none hover:text-indigo-600"
              >
                Edit
              </button>
              <button
                onClick={handleDelete}
                className="text-red-500 hover:text-red-700 focus:outline-none"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TodoItem;
