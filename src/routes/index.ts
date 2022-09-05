import { Router } from "express";

import { authenticateRoutes } from "./authenticate.routes";
import { userRoutes } from "./user.routes";

const router = Router();

router.use("/user", userRoutes);
router.use(authenticateRoutes);

export { router };
