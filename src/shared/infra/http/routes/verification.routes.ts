import { Router } from "express";

import { CreateVerificationController } from "../../../../modules/verifications/useCases/createVerification/CreateVerificationController";
import { ListVerificationController } from "../../../../modules/verifications/useCases/listVerification/ListVerificationController";

const verificationRoutes = Router();

const createVerificationController = new CreateVerificationController();
verificationRoutes.post("/", createVerificationController.handle);

const listVerificationController = new ListVerificationController();
verificationRoutes.get("/", listVerificationController.handle);

export { verificationRoutes };
