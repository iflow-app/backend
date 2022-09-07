import { Router } from "express";

import { artifactRoutes } from "./artifact.routes";
import { authenticateRoutes } from "./authenticate.routes";
import { contentRoutes } from "./content.routes";
import { projectRoutes } from "./project.routes";
import { requirementRoutes } from "./requirements.routes";
import { userRoutes } from "./user.routes";

const router = Router();

router.use("/artifact", artifactRoutes);
router.use("/content", contentRoutes);
router.use("/project", projectRoutes);
router.use("/requirement", requirementRoutes);
router.use("/user", userRoutes);

router.use(authenticateRoutes);

export { router };
