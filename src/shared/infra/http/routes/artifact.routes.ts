import { Router } from "express";

import { CreateArtifactController } from "../../../../modules/artifacts/useCases/createArtifact/CreateArtifactController";
import { ListArtifactController } from "../../../../modules/artifacts/useCases/listArtifact/ListArtifactController";

const artifactRoutes = Router();

const createArtifactController = new CreateArtifactController();
artifactRoutes.post("/", createArtifactController.handle);

const listArtifactController = new ListArtifactController();
artifactRoutes.get("/", listArtifactController.handle);

export { artifactRoutes };
