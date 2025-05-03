import { Hono } from "hono";
import * as todoController from "../controllers/todo.controller.ts";

const todoRouter = new Hono();

todoRouter.post("/", todoController.createTodo);
todoRouter.get("/", todoController.getTodo);
todoRouter.get("/user", todoController.getAllTodosFromUser);
todoRouter.patch("/completed", todoController.updateTodoCompleted);
todoRouter.patch("/title", todoController.updateTodoTitle);
todoRouter.delete("/", todoController.deleteTodo);

export { todoRouter };
