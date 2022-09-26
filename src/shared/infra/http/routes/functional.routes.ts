import { Router } from "express";

import { CreateBacklogRelationController } from "../../../../modules/requirements/useCases/createBacklogRelation/CreateBacklogRelationController";
import { CreateFunctionalController } from "../../../../modules/requirements/useCases/createFunctional/CreateFunctionalController";
import { GenerateMVPController } from "../../../../modules/requirements/useCases/generateMVP/GenerateMVPController";
import { ListFunctionalController } from "../../../../modules/requirements/useCases/listFunctional/ListFunctionalController";
import { UpdateFunctionalController } from "../../../../modules/requirements/useCases/updateFunctional/UpdateFunctionalController";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";

const functionalRoutes = Router();

const createFunctionalController = new CreateFunctionalController();
functionalRoutes.post(
  "/",
  ensureAuthenticated,
  createFunctionalController.handle
);

const updateFunctionalController = new UpdateFunctionalController();
functionalRoutes.patch(
  "/:functional_id",
  ensureAuthenticated,
  updateFunctionalController.handle
);

const createBacklogRelationController = new CreateBacklogRelationController();
functionalRoutes.patch(
  "/:functional_id/backlog",
  ensureAuthenticated,
  createBacklogRelationController.handle
);

const listFunctionalController = new ListFunctionalController();
functionalRoutes.get("/", ensureAuthenticated, listFunctionalController.handle);

const generateMVPController = new GenerateMVPController();
functionalRoutes.get("/mvp", generateMVPController.handle);

export { functionalRoutes };
