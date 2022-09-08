import { Router } from "express";

import { CreateNonFunctionalController } from "../../../../modules/requirements/useCases/createNonFunctional/CreateNonFunctionalController";
import { ListNonFunctionalController } from "../../../../modules/requirements/useCases/listNonFunctional/ListNonFunctionalController";
import { UpdateNonFunctionalController } from "../../../../modules/requirements/useCases/updateNonFunctional/UpdateNonFunctionalController";

const nonFunctionalRoutes = Router();

const createNonFunctionalController = new CreateNonFunctionalController();
nonFunctionalRoutes.post("/", createNonFunctionalController.handle);

const updateNonFunctionalController = new UpdateNonFunctionalController();
nonFunctionalRoutes.patch(
  "/:nfunctional_id",
  updateNonFunctionalController.handle
);

const listNonFunctionalController = new ListNonFunctionalController();
nonFunctionalRoutes.get("/", listNonFunctionalController.handle);

export { nonFunctionalRoutes };
