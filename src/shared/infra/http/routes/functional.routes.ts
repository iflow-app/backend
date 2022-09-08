import { Router } from "express";

import { CreateBacklogRelationController } from "../../../../modules/requirements/useCases/createBacklogRelation/CreateBacklogRelationController";
import { CreateFunctionalController } from "../../../../modules/requirements/useCases/createFunctional/CreateFunctionalController";
import { ListFunctionalController } from "../../../../modules/requirements/useCases/listFunctional/ListFunctionalController";
import { UpdateFunctionalController } from "../../../../modules/requirements/useCases/updateFunctional/UpdateFunctionalController";

const functionalRoutes = Router();

const createFunctionalController = new CreateFunctionalController();
functionalRoutes.post("/", createFunctionalController.handle);

const updateFunctionalController = new UpdateFunctionalController();
functionalRoutes.patch("/:functional_id", updateFunctionalController.handle);

const createBacklogRelationController = new CreateBacklogRelationController();
functionalRoutes.patch(
  "/:functional_id/backlog",
  createBacklogRelationController.handle
);

const listFunctionalController = new ListFunctionalController();
functionalRoutes.get("/", listFunctionalController.handle);

export { functionalRoutes };