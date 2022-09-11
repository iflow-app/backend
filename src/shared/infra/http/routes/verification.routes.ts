import { Router } from "express";

import { CreateVerificationController } from "../../../../modules/verifications/useCases/createVerification/CreateVerificationController";
import { ListVerificationController } from "../../../../modules/verifications/useCases/listVerification/ListVerificationController";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";

const verificationRoutes = Router();

const createVerificationController = new CreateVerificationController();
verificationRoutes.post(
  "/",
  ensureAuthenticated,
  createVerificationController.handle
);

const listVerificationController = new ListVerificationController();
verificationRoutes.get(
  "/",
  ensureAuthenticated,
  listVerificationController.handle
);

export { verificationRoutes };
