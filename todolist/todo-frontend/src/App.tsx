import { useState, useEffect } from "react";
import "./App.css";
import { TodoAPI } from "./services/api";

export type Todo = {
  id: number;
  name: string;
  success: boolean;
};

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState<string>("");
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editText, setEditText] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        setIsLoading(true);
        const data = await TodoAPI.getAllTodos();
        setTodos(data);
        setError(null);
      } catch (err) {
        setError("Failed to fetch todos. Please try again later.");
        console.error("Error fetching todos:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTodos();
  }, []);

  const handleAdd = async () => {
    if (newTodo.trim() === "") return;

    try {
      const newTask = await TodoAPI.createTodo({
        name: newTodo,
        success: false,
      });

      setTodos((prev) => [...prev, newTask]);
      setNewTodo("");
    } catch (err) {
      setError("Failed to add todo. Please try again.");
      console.error("Error adding todo:", err);
    }
  };

  const handleSuccess = async (id: number) => {
    try {
      const todoToToggle = todos.find((todo) => todo.id === id);
      if (!todoToToggle) return;

      const updatedTodo = await TodoAPI.toggleTodoStatus(
        id,
        !todoToToggle.success,
      );

      setTodos((prev) =>
        prev.map((todo) => (todo.id === id ? updatedTodo : todo)),
      );
    } catch (err) {
      setError("Failed to update todo status. Please try again.");
      console.error("Error updating todo status:", err);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await TodoAPI.deleteTodo(id);
      setTodos((prev) => prev.filter((todo) => todo.id !== id));
    } catch (err) {
      setError("Failed to delete todo. Please try again.");
      console.error("Error deleting todo:", err);
    }
  };

  const handleEdit = (id: number, currentName: string) => {
    setEditingId(id);
    setEditText(currentName);
  };

  const handleSave = async (id: number) => {
    if (editText.trim() === "") return;

    try {
      const todoToUpdate = todos.find((todo) => todo.id === id);
      if (!todoToUpdate) return;

      const updatedTodo = await TodoAPI.updateTodo({
        ...todoToUpdate,
        name: editText,
      });

      setTodos((prev) =>
        prev.map((todo) => (todo.id === id ? updatedTodo : todo)),
      );

      setEditingId(null);
      setEditText("");
    } catch (err) {
      setError("Failed to update todo. Please try again.");
      console.error("Error updating todo:", err);
    }
  };

  return (
    <div className="w-screen min-h-screen bg-gradient-to-br from-blue-200 to-green-300 flex items-center justify-center p-5">
      <div className="bg-white rounded-3xl shadow-2xl p-10 w-full max-w-2xl flex flex-col gap-6">
        <h1 className="text-3xl font-bold text-center text-green-700">
          Todo List
        </h1>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
            {error}
            <button
              className="absolute top-0 right-0 px-4 py-3"
              onClick={() => setError(null)}
            >
              &times;
            </button>
          </div>
        )}

        <div className="flex gap-4">
          <input
            type="text"
            className="flex-1 p-3 rounded-xl border-2 border-green-400 focus:outline-none focus:ring-2 focus:ring-green-500"
            placeholder="Enter a new todo..."
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleAdd()}
          />
          <button
            className="bg-green-500 hover:bg-green-600 text-white px-5 py-3 rounded-xl font-semibold"
            onClick={handleAdd}
          >
            Add
          </button>
        </div>

        <div className="flex flex-col gap-4">
          {isLoading ? (
            <p className="text-center text-gray-500">Loading todos...</p>
          ) : todos.length === 0 ? (
            <p className="text-center text-gray-500">No tasks yet!</p>
          ) : (
            todos.map((todo) => (
              <div
                key={todo.id}
                className="flex items-center justify-between bg-green-100 p-5 rounded-2xl shadow-md hover:scale-[1.02] transition-transform"
              >
                <div className="flex items-center gap-4 flex-1">
                  <input
                    type="checkbox"
                    checked={todo.success}
                    onChange={() => handleSuccess(todo.id)}
                    className="w-5 h-5 text-green-600"
                  />
                  {editingId === todo.id ? (
                    <input
                      type="text"
                      value={editText}
                      onChange={(e) => setEditText(e.target.value)}
                      onKeyDown={(e) =>
                        e.key === "Enter" && handleSave(todo.id)
                      }
                      className="flex-1 p-2 rounded-lg border border-green-400"
                    />
                  ) : (
                    <span
                      className={`text-lg ${
                        todo.success
                          ? "line-through text-gray-400"
                          : "text-green-900"
                      }`}
                    >
                      {todo.name}
                    </span>
                  )}
                </div>

                <div className="flex gap-2">
                  {editingId === todo.id ? (
                    <button
                      className="text-blue-500 hover:text-blue-700 font-bold"
                      onClick={() => handleSave(todo.id)}
                    >
                      Save
                    </button>
                  ) : (
                    <button
                      className="text-blue-500 hover:text-blue-700 font-bold"
                      onClick={() => handleEdit(todo.id, todo.name)}
                    >
                      Edit
                    </button>
                  )}
                  <button
                    className="text-red-500 hover:text-red-700 font-bold"
                    onClick={() => handleDelete(todo.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
