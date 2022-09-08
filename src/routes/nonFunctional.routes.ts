import { Router } from "express";

import { CreateNonFunctionalController } from "../modules/requirements/useCases/createNonFunctional/CreateNonFunctionalController";
import { UpdateNonFunctionalController } from "../modules/requirements/useCases/updateNonFunctional/UpdateNonFunctionalController";

const nonFunctionalRoutes = Router();

const createNonFunctionalController = new CreateNonFunctionalController();
nonFunctionalRoutes.post("/", createNonFunctionalController.handle);

const updateNonFunctionalController = new UpdateNonFunctionalController();
nonFunctionalRoutes.patch(
  "/:nfunctional_id",
  updateNonFunctionalController.handle
);

export { nonFunctionalRoutes };
