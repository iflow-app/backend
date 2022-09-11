import { Router } from "express";

import { CreateUserController } from "../../../../modules/accounts/useCases/createUser/CreateUserController";
import { ListUserProjectController } from "../../../../modules/accounts/useCases/listUserProjects/ListUserProjectsController";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";

const userRoutes = Router();

const createUserController = new CreateUserController();
userRoutes.post("/", createUserController.handle);

const listUserProjectsController = new ListUserProjectController();
userRoutes.get(
  "/projects",
  ensureAuthenticated,
  listUserProjectsController.handle
);

export { userRoutes };
