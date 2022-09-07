import { Router } from "express";

import { artifactRoutes } from "./artifact.routes";
import { authenticateRoutes } from "./authenticate.routes";
import { contentRoutes } from "./content.routes";
import { functionalRoutes } from "./functional.routes";
import { nonFunctionalRoutes } from "./nonFunctional.routes";
import { projectRoutes } from "./project.routes";
import { userRoutes } from "./user.routes";

const router = Router();

router.use("/artifact", artifactRoutes);
router.use("/content", contentRoutes);
router.use("/functional", functionalRoutes);
router.use("/non-functional", nonFunctionalRoutes);
router.use("/project", projectRoutes);
router.use("/user", userRoutes);

router.use(authenticateRoutes);

export { router };
