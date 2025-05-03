import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { PrismaClient } from "./generated/prisma/index.js";
import { mainRouter } from "./routes/index.route.ts";

const app = new Hono();
export const db = new PrismaClient();

app.get("/", (c) => {
  return c.text("Hello Hono!");
});

db.$connect()
  .then(() => {
    console.log("Connected to the database");
  })
  .catch((err) => {
    console.error("Error connecting to the database", err);
  });

app.route("", mainRouter);

serve(
  {
    fetch: app.fetch,
    port: 3000,
  },
  (info) => {
    console.log(`Server is running on http://localhost:${info.port}`);
  },
);
