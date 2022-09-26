import { classToClass } from "class-transformer";

import { IArtifactResponseDTO } from "../dtos/IArtifactResponseDTO";
import { Artifact } from "../entities/Artifact";
import { ContentMap } from "./ContentMap";

class ArtifactMap {
  static toDTO({
    artifact_id,
    name,
    stage,
    project,
    contents,
    evolve,
    functionals,
    non_functionals,
    verifications,
  }: Artifact): IArtifactResponseDTO {
    const contentsResponse =
      contents && contents.map((content) => ContentMap.toDTO(content));

    const artifact = classToClass({
      artifact_id,
      name,
      stage,
      project,
      contents: contentsResponse,
      evolve,
      functionals,
      non_functionals,
      verifications,
    });

    return artifact;
  }
}

export { ArtifactMap };
