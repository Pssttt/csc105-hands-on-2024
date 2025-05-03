import { Hono } from "hono";
import { userRouter } from "./user.route.ts";
import { todoRouter } from "./todo.route.ts";

const mainRouter = new Hono();

mainRouter.route("/users", userRouter);
mainRouter.route("/todos", todoRouter);

export { mainRouter };
