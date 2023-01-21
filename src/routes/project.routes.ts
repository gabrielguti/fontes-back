import { Router } from "express";
import { projectController } from "../controllers/_index";
import { projectSchema, projectSchemaToPut } from "../schemas/project.schema";
import wrapValidation from "../middlewares/validateRoutes";

export function routes(app: Router) {
  app.post(
    "/project",
    wrapValidation(projectController.createProject, projectSchema.create),
    () => {}
  );
  app.get(
    "/projects",
    projectController.getProjectsByUsername
  );
  app.get(
    "/project",
    projectController.getProjectById
  )
app.delete(
  "/projects/:id",
  projectController.deleteProjectById
);
app.put(
  "/projects/:id",
  wrapValidation(projectController.editProjectFields, projectSchemaToPut.create),
  () => {}
);
app.patch(
  "/projects/:id/done",
  projectController.editStatusProject
)
}
