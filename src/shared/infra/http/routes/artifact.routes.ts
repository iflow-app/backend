import { Router } from "express";

import { CreateArtifactController } from "../../../../modules/artifacts/useCases/createArtifact/CreateArtifactController";

const artifactRoutes = Router();

const createArtifactController = new CreateArtifactController();
artifactRoutes.post("/", createArtifactController.handle);

export { artifactRoutes };
