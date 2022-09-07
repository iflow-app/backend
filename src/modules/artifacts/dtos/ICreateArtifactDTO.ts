import { ArtifactStageEnum } from "../entities/Artifact";

interface ICreateArtifactDTO {
  name: string;
  stage: ArtifactStageEnum;
  project_id: string;
}

export { ICreateArtifactDTO };
