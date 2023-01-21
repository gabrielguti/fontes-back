import { Router } from "express";
import * as UserRoutes from "./user.routes";
import * as ProjectRoutes from "./project.routes";

export function initRoutes(app: Router) {
  UserRoutes.routes(app);
  ProjectRoutes.routes(app);
}
