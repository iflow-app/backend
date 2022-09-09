import { Router } from "express";

import { CreateCheckpointController } from "../../../../modules/verifications/useCases/createCheckpoint/CreateCheckpointController";

const checkpointRoutes = Router();

const createCheckpointController = new CreateCheckpointController();
checkpointRoutes.post("/", createCheckpointController.handle);

export { checkpointRoutes };
