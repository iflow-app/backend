import { Router } from "express";

import { CreateUserController } from "../modules/accounts/useCases/createUser/CreateUserController";
import { ListUserProjectController } from "../modules/accounts/useCases/listUserProjects/ListUserProjectsController";

const userRoutes = Router();

const listUserProjectsController = new ListUserProjectController();

const createUserController = new CreateUserController();

userRoutes.get("/:user_id/projects", listUserProjectsController.handle);

userRoutes.post("/", createUserController.handle);

export { userRoutes };
