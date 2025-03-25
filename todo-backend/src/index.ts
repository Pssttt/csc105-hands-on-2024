import { Hono } from "hono";
import { logger } from "hono/logger";
import todoRoutes from "./routes/todo.routes.ts";
import { serve } from "@hono/node-server";

// Create a new Hono app
const app = new Hono();

// Add middleware for logging requests
app.use("*", logger());

// Root route
app.get("/", (c) => {
  return c.json({
    message: "Welcome to our Todo API!",
    status: "Server is running",
  });
});

// Mount todo routes
app.route("/todos", todoRoutes);

// Start the server
const port = 3000;

serve(
  {
    fetch: app.fetch,
    port,
  },
  (info) => console.log(`Server running at http://localhost:${info.port}`),
);

// import { serve } from "@hono/node-server";
// import { Hono, Next, Context } from "hono";
//
// interface Todo {
//   id: number;
//   title: string;
//   completed: boolean;
// }
//
// type Variables = {
//   id: number;
// };
//
// const todos: Todo[] = [
//   {
//     id: 1,
//     title: "Learn Hono",
//     completed: false,
//   },
//   {
//     id: 2,
//     title: "Build a REST API",
//     completed: false,
//   },
//   {
//     id: 3,
//     title: "Test with POSTMAN",
//     completed: true,
//   },
// ];
//
// const app = new Hono<{ Variables: Variables }>();
//
// app.get("/", (c) => {
//   return c.text("Testing");
// });
//
// const loggerMiddleware = async (c: Context, next: Next) => {
//   const start = Date.now();
//   console.log(`Received ${c.req.method} request to ${c.req.path}`);
//
//   await next();
//
//   const time = Date.now() - start;
//   console.log(`Request completed in ${time}ms with status ${c.res.status}`);
// };
//
// async function validateParamId(c: Context, next: Next) {
//   const idParam = c.req.param("id");
//   if (!/^\d+$/.test(idParam)) {
//     return c.json({
//       success: false,
//       msg: `ID is supposed to be a number`,
//     });
//   }
//
//   c.set("id", loggerMiddleware);
//   await next();
// }
//
// app.use("*", loggerMiddleware);
//
// // GET all todos
// app.get("/todos", (c) => {
//   return c.json(todos);
// });
//
// // GET a specific todo by ID
// app.get("/todos/:id", validateParamId, (c) => {
//   const id: number = parseInt(c.req.param("id"));
//   const todo = todos.find((t) => t.id === id);
//
//   if (!todo) {
//     return c.json({ error: "Todo not found" }, 404);
//   }
//
//   return c.json(todo);
// });
//
// type createTodoBody = {
//   title: string;
//   completed: boolean;
// };
//
// // POST - create a new TODO
// app.post("/todos", async (c) => {
//   try {
//     const data: createTodoBody = await c.req.json();
//
//     if (!data.title || typeof data.title !== "string") {
//       return c.json({ error: "Title is required and must be a string" }, 400);
//     }
//
//     let lastMaxId: number = 0;
//     todos.forEach((todo) => (lastMaxId = Math.max(lastMaxId, todo.id)));
//
//     const newTodo: Todo = {
//       id: lastMaxId + 1,
//       title: data.title,
//       completed: data.completed === true,
//     };
//
//     todos.push(newTodo);
//
//     return c.json({
//       success: true,
//       data: newTodo,
//       msg: "Done creating new Todo",
//     });
//   } catch (error: any) {
//     return c.json(
//       {
//         success: false,
//         error: "Invalid JSON in request body",
//         code: error.toString(),
//       },
//       400,
//     );
//   }
// });
//
// app.patch("/todos/done", async (c) => {
//   try {
//     const id = c.req.query("id");
//     if (!id) {
//       return c.json({
//         success: false,
//         msg: `ID ${id} does not exist`,
//       });
//     }
//     if (!/^\d+$/.test(id)) {
//       return c.json({
//         success: false,
//         msg: `ID is supposed to be a number`,
//       });
//     }
//
//     todos.forEach((t) => {
//       if (t.id == parseInt(id)) t.completed = true;
//     });
//
//     return c.json({
//       success: true,
//       msg: `Done updating`,
//     });
//   } catch (err: any) {
//     return c.json({
//       success: false,
//       msg: err.toString(),
//     });
//   }
// });
//
// app.patch("/todos/update", async (c) => {
//   try {
//     const title = c.req.query("title");
//     const newTitle = c.req.query("newTitle");
//
//     if (!title || !newTitle) {
//       return c.json({
//         success: false,
//         msg: "Both title and newTitle are required",
//       });
//     }
//
//     const todo = todos.find((t) => t.title === title);
//     if (!todo) {
//       return c.json({
//         success: false,
//         msg: `Todo with title '${title}' not found`,
//       });
//     }
//
//     todo.title = newTitle;
//
//     return c.json({
//       success: true,
//       msg: `Updated '${title}' to '${newTitle}'`,
//       updatedTodo: todo,
//     });
//   } catch (err: any) {
//     return c.json({
//       success: false,
//       msg: err.toString(),
//     });
//   }
// });
//
// app.delete("/todos/delete", (c) => {
//   const id = c.req.query("id");
//   if (!id) {
//     return c.json({
//       success: false,
//       msg: `ID ${id} does not exist`,
//     });
//   }
//   if (!/^\d+$/.test(id)) {
//     return c.json({
//       success: false,
//       msg: `ID is supposed to be a number`,
//     });
//   }
//
//   const todoId = todos.findIndex((t) => t.id === Number(id));
//   const deletedTodo = todos[todoId];
//
//   todos.splice(todoId, 1);
//
//   return c.json({
//     success: true,
//     msg: `ID ${id} deleted successfully`,
//     deleted: deletedTodo,
//   });
// });
//
// serve(
//   {
//     fetch: app.fetch,
//     port: 3000,
//   },
//   (info) => {
//     console.log(`Server is running on http://localhost:${info.port}`);
//   },
// );
