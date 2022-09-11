import { Router } from "express";

import { CreateNonFunctionalController } from "../../../../modules/requirements/useCases/createNonFunctional/CreateNonFunctionalController";
import { ListNonFunctionalController } from "../../../../modules/requirements/useCases/listNonFunctional/ListNonFunctionalController";
import { UpdateNonFunctionalController } from "../../../../modules/requirements/useCases/updateNonFunctional/UpdateNonFunctionalController";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";

const nonFunctionalRoutes = Router();

const createNonFunctionalController = new CreateNonFunctionalController();
nonFunctionalRoutes.post(
  "/",
  ensureAuthenticated,
  createNonFunctionalController.handle
);

const updateNonFunctionalController = new UpdateNonFunctionalController();
nonFunctionalRoutes.patch(
  "/:nfunctional_id",
  ensureAuthenticated,
  updateNonFunctionalController.handle
);

const listNonFunctionalController = new ListNonFunctionalController();
nonFunctionalRoutes.get(
  "/",
  ensureAuthenticated,
  listNonFunctionalController.handle
);

export { nonFunctionalRoutes };
