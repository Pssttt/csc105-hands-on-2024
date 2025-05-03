import { db } from "../index.ts";

const createTodo = async (title: string, userId: number) => {
  const todo = await db.todo.create({
    data: {
      title: title,
      userId: userId,
    },
  });
  return todo;
};

const getTodo = async (id: number) => {
  const todo = await db.todo.findUnique({
    where: {
      id: id,
    },
    include: {
      user: true,
    },
  });
  return todo;
};

const updateTodoCompleted = async (id: number) => {
  const todo = await db.todo.update({
    where: {
      id: id,
    },
    data: {
      completed: true,
    },
  });
  return todo;
};

const updateTodoTitle = async (id: number, title: string) => {
  const todo = await db.todo.update({
    where: {
      id: id,
    },
    data: {
      title: title,
    },
  });
  return todo;
};

const getAllTodosFromUser = async (id: number) => {
  const todos = await db.todo.findMany({
    where: {
      userId: id,
    },
  });
  return todos;
};

const deleteTodo = async (id: number) => {
  const todo = await db.todo.delete({
    where: {
      id: id,
    },
  });
  return todo;
};

export {
  createTodo,
  getTodo,
  updateTodoCompleted,
  updateTodoTitle,
  getAllTodosFromUser,
  deleteTodo,
};
