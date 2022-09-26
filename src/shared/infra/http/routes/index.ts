import { Router } from "express";

import { SeedController } from "../../typeorm/seeds/SeedController";
import { artifactRoutes } from "./artifact.routes";
import { authenticateRoutes } from "./authenticate.routes";
import { checkpointRoutes } from "./checkpoint.routes";
import { contentRoutes } from "./content.routes";
import { functionalRoutes } from "./functional.routes";
import { houseOfQualityRoutes } from "./houseOfQuality.routes";
import { nonFunctionalRoutes } from "./nonFunctional.routes";
import { projectRoutes } from "./project.routes";
import { userRoutes } from "./user.routes";
import { verificationRoutes } from "./verification.routes";

const router = Router();

router.use("/artifact", artifactRoutes);
router.use("/checkpoint", checkpointRoutes);
router.use("/content", contentRoutes);
router.use("/functional", functionalRoutes);
router.use("/house-of-quality", houseOfQualityRoutes);
router.use("/non-functional", nonFunctionalRoutes);
router.use("/project", projectRoutes);
router.use("/user", userRoutes);
router.use("/verification", verificationRoutes);

router.use(authenticateRoutes);

const seedController = new SeedController();
router.get("/seeds", seedController.handle);

export { router };
