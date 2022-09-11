import { Router } from "express";

import { CreateCheckpointController } from "../../../../modules/verifications/useCases/createCheckpoint/CreateCheckpointController";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";

const checkpointRoutes = Router();

const createCheckpointController = new CreateCheckpointController();
checkpointRoutes.post(
  "/",
  ensureAuthenticated,
  createCheckpointController.handle
);

export { checkpointRoutes };
