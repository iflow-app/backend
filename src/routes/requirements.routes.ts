import { Router } from "express";

import { CreateRequirementController } from "../modules/requirements/useCases/createRequirement/CreateRequirementController";

const requirementRoutes = Router();

const createRequirementController = new CreateRequirementController();
requirementRoutes.post("/", createRequirementController.handle);

export { requirementRoutes };
