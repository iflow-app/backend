import { Router } from "express";

import { CreateFunctionalController } from "../modules/requirements/useCases/createFunctional/CreateFunctionalController";

const functionalRoutes = Router();

const createFunctionalController = new CreateFunctionalController();
functionalRoutes.post("/", createFunctionalController.handle);

export { functionalRoutes };
