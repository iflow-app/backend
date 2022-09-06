import { Router } from "express";

import { authenticateRoutes } from "./authenticate.routes";
import { projectRoutes } from "./project.routes";
import { userRoutes } from "./user.routes";

const router = Router();

router.use("/project", projectRoutes);
router.use("/user", userRoutes);

router.use(authenticateRoutes);

export { router };
