import { Router } from "express";

import { CreateProjectController } from "../../../../modules/accounts/useCases/createProject/CreateProjectController";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";

const projectRoutes = Router();

const createProjectController = new CreateProjectController();

projectRoutes.post("/", ensureAuthenticated, createProjectController.handle);

export { projectRoutes };
