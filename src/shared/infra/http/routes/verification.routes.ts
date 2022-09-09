import { Router } from "express";

import { CreateVerificationController } from "../../../../modules/verifications/useCases/createVerification/CreateVerificationController";

const verificationRoutes = Router();

const createVerificationController = new CreateVerificationController();
verificationRoutes.post("/", createVerificationController.handle);

export { verificationRoutes };
