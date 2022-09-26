import { Project } from "../../accounts/entities/Project";
import { Functional } from "../../requirements/entities/Functional";
import { NonFunctional } from "../../requirements/entities/NonFunctional";
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
  functionals?: Functional[];
  non_functionals?: NonFunctional[];
  verifications?: Verification[];
}

export { IArtifactResponseDTO };
