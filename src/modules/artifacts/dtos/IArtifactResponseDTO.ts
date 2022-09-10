import { Project } from "../../accounts/entities/Project";
import { Requirement } from "../../requirements/entities/Requirement";
import { Verification } from "../../verifications/entities/Verification";
import { Artifact } from "../entities/Artifact";
import { IContentResponseDTO } from "./IContentResponseDTO";

interface IArtifactResponseDTO {
  artifact_id: string;
  name: string;
  stage: string;
  project?: Project;
  contents?: IContentResponseDTO[];
  evolve?: Artifact;
  requirements?: Requirement[];
  verifications?: Verification[];
}

export { IArtifactResponseDTO };
