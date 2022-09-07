import { Router } from "express";

import { CreateFunctionalController } from "../modules/requirements/useCases/createFunctional/CreateFunctionalController";
import { UpdateFunctionalController } from "../modules/requirements/useCases/updateFunctional/UpdateFunctionalController";

const functionalRoutes = Router();

const createFunctionalController = new CreateFunctionalController();
functionalRoutes.post("/", createFunctionalController.handle);

const updateFunctionalController = new UpdateFunctionalController();
functionalRoutes.patch("/:functional_id", updateFunctionalController.handle);

export { functionalRoutes };
