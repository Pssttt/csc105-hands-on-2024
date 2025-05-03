import type { Context } from "hono";
import * as todoModel from "../models/todo.model.ts";

type createTodoBody = {
  title: string;
  userId: number;
};

type updateTodoTitleBody = {
  title: string;
};

const createTodo = async (c: Context) => {
  try {
    const body = await c.req.json<createTodoBody>();
    if (!body.title || !body.userId) {
      return c.json(
        {
          success: false,
          data: null,
          msg: "Missing required fields",
        },
        400,
      );
    }

    const newTodo = await todoModel.createTodo(body.title, body.userId);

    return c.json({
      success: true,
      data: newTodo,
      msg: "Created new todo!",
    });
  } catch (e) {
    return c.json(
      {
        success: false,
        data: null,
        msg: `${e}`,
      },
      500,
    );
  }
};

const getTodo = async (c: Context) => {
  try {
    const param = c.req.query("id");
    if (param != undefined && param != null) {
      const data = await todoModel.getTodo(parseInt(param));
      return c.json(data, 200);
    }

    return c.json(
      {
        success: false,
        data: null,
        msg: "Missing required fields",
      },
      400,
    );
  } catch (e) {
    return c.json(
      {
        success: false,
        data: null,
        msg: `${e}`,
      },
      500,
    );
  }
};

const updateTodoCompleted = async (c: Context) => {
  try {
    const param = c.req.query("id");
    if (param != undefined && param != null) {
      const data = await todoModel.updateTodoCompleted(parseInt(param));
      return c.json(data, 200);
    }
    return c.json({
      success: false,
      data: null,
      msg: "Missing required fields",
    });
  } catch (e) {
    return c.json({
      success: false,
      data: null,
      msg: `${e}`,
    });
  }
};

const updateTodoTitle = async (c: Context) => {
  try {
    const param = c.req.query("id");
    const body = await c.req.json<updateTodoTitleBody>();
    if (param != undefined && param != null) {
      if (!body.title) {
        return c.json(
          {
            success: false,
            data: null,
            msg: "Missing required fields",
          },
          400,
        );
      }
      const data = await todoModel.updateTodoTitle(parseInt(param), body.title);
      return c.json(
        {
          success: true,
          data: data,
          msg: "Updated title!",
        },
        200,
      );
    }
    return c.json(
      {
        success: false,
        data: null,
        msg: "Missing required fields",
      },
      400,
    );
  } catch (e) {
    return c.json({
      success: false,
      data: null,
      msg: `${e}`,
    });
  }
};

const getAllTodosFromUser = async (c: Context) => {
  try {
    const param = c.req.query("id");
    if (param !== undefined && param !== null) {
      const data = await todoModel.getAllTodosFromUser(parseInt(param));
      return c.json(data, 200);
    }
    return c.json(
      {
        success: false,
        data: null,
        msg: "Missing required fields",
      },
      400,
    );
  } catch (e) {
    return c.json(
      {
        success: false,
        data: null,
        msg: `${e}`,
      },
      500,
    );
  }
};

const deleteTodo = async (c: Context) => {
  try {
    const query = c.req.query("id");
    if (query !== undefined && query !== null) {
      const data = await todoModel.deleteTodo(parseInt(query));
      return c.json(data, 200);
    }
    return c.json(
      {
        success: false,
        data: null,
        msg: "Missing required fields",
      },
      400,
    );
  } catch (e) {
    return c.json(
      {
        success: false,
        data: null,
        msg: `${e}`,
      },
      500,
    );
  }
};

export {
  createTodo,
  getTodo,
  updateTodoCompleted,
  updateTodoTitle,
  getAllTodosFromUser,
  deleteTodo,
};
