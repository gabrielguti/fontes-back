import { Router } from "express";
import { userController } from "../controllers/_index";
import { userLoginSchema, userSchema } from "../schemas/user.schema";
import wrapValidation from "../middlewares/validateRoutes";

export function routes(app: Router) {
  app.post(
    "/users",
    wrapValidation(userController.createUser, userSchema.create),
    () => {}
  );
  app.post(
    "/login",
    wrapValidation(userController.login, userLoginSchema.create),
    () => {

    }
  )
}
