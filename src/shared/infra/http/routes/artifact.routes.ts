import { Router } from "express";

import { CreateArtifactController } from "../../../../modules/artifacts/useCases/createArtifact/CreateArtifactController";
import { ListArtifactController } from "../../../../modules/artifacts/useCases/listArtifact/ListArtifactController";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";

const artifactRoutes = Router();

const createArtifactController = new CreateArtifactController();
artifactRoutes.post("/", ensureAuthenticated, createArtifactController.handle);

const listArtifactController = new ListArtifactController();
artifactRoutes.get("/", ensureAuthenticated, listArtifactController.handle);

export { artifactRoutes };
