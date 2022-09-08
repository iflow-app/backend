import { Router } from "express";

import { CreateProjectController } from "../../../../modules/accounts/useCases/createProject/CreateProjectController";

const projectRoutes = Router();

const createProjectController = new CreateProjectController();

projectRoutes.post("/", createProjectController.handle);

export { projectRoutes };
