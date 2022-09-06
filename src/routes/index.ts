import { Router } from "express";

import { authenticateRoutes } from "./authenticate.routes";
import { contentRoutes } from "./content.routes";
import { projectRoutes } from "./project.routes";
import { userRoutes } from "./user.routes";

const router = Router();

router.use("/content", contentRoutes);
router.use("/project", projectRoutes);
router.use("/user", userRoutes);

router.use(authenticateRoutes);

export { router };
