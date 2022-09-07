import { Router } from "express";

import { CreateNonFunctionalController } from "../modules/requirements/useCases/createNonFunctional/CreateNonFunctionalController";

const nonFunctionalRoutes = Router();

const createNonFunctionalController = new CreateNonFunctionalController();
nonFunctionalRoutes.post("/", createNonFunctionalController.handle);

export { nonFunctionalRoutes };
