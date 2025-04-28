import axios from "axios";
import type { Todo } from "../App";

const API_URL = "http://localhost:3000/todos";

type ServerTodo = {
  id: number;
  title: string;
  completed: boolean;
};

const toClientTodo = (serverTodo: ServerTodo): Todo => ({
  id: serverTodo.id,
  name: serverTodo.title,
  success: serverTodo.completed,
});

const toServerTodo = (clientTodo: Todo): ServerTodo => ({
  id: clientTodo.id,
  title: clientTodo.name,
  completed: clientTodo.success,
});

export const TodoAPI = {
  getAllTodos: async (): Promise<Todo[]> => {
    const response = await axios.get(API_URL);
    return response.data.map(toClientTodo);
  },

  createTodo: async (todo: Omit<Todo, "id">): Promise<Todo> => {
    const response = await axios.post(API_URL, {
      title: todo.name,
      completed: todo.success,
    });
    return toClientTodo(response.data);
  },

  updateTodo: async (todo: Todo): Promise<Todo> => {
    const response = await axios.put(
      `${API_URL}/${todo.id}`,
      toServerTodo(todo),
    );
    return toClientTodo(response.data);
  },

  toggleTodoStatus: async (id: number, completed: boolean): Promise<Todo> => {
    const response = await axios.patch(`${API_URL}/${id}`, { completed });
    return toClientTodo(response.data);
  },

  deleteTodo: async (id: number): Promise<void> => {
    await axios.delete(`${API_URL}/${id}`);
  },
};
