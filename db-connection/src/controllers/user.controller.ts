import type { Context } from "hono";
import * as userModel from "../models/user.model.ts";

type createUserBody = {
  firstName: string;
  lastName: string;
};

const createUser = async (c: Context) => {
  try {
    const body = await c.req.json<createUserBody>();
    if (!body.firstName || !body.lastName) {
      return c.json(
        {
          success: false,
          data: null,
          msg: "Missing required fields",
        },
        400,
      );
    }

    if (await userModel.isDuplicate(body.firstName, body.lastName)) {
      return c.json({
        success: false,
        data: null,
        msg: "First name or Last name is duplicate",
      });
    }

    const newUser = await userModel.createUser(body.firstName, body.lastName);

    return c.json({
      success: true,
      data: newUser,
      msg: "Created new user!",
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

const getUsers = async (c: Context) => {
  try {
    const users = await userModel.getUsers();
    return c.json(
      {
        success: true,
        data: users,
        msg: "Listed all users",
      },
      200,
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

const updateUserFirstAndLastNames = async (c: Context) => {
  try {
    const param = c.req.query("id");
    const body = await c.req.json<createUserBody>();

    if (param != undefined && param != null) {
      if (!body.firstName && !body.lastName) {
        return c.json(
          {
            success: false,
            data: null,
            msg: "Missing required fields",
          },
          400,
        );
      }
      const data = await userModel.updateUserFirstAndLastNames(
        parseInt(param),
        body.firstName ?? undefined,
        body.lastName ?? undefined,
      );
      return c.json(
        {
          success: true,
          data: data,
          msg: "Updated info",
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
    return c.json(
      {
        success: false,
        data: null,
        msg: `${e}`,
      },
      400,
    );
  }
};

export { createUser, getUsers, updateUserFirstAndLastNames };
