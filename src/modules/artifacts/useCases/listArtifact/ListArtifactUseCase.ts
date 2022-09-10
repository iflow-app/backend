import { inject, injectable } from "tsyringe";

import { IListArtifactDTO } from "../../dtos/IListArtifactDTO";
import { Artifact } from "../../entities/Artifact";
import { IArtifactRepository } from "../../repositories/IArtifactRepository";

@injectable()
class ListArtifactUseCase {
  constructor(
    @inject("ArtifactRepository")
    private artifactRepository: IArtifactRepository
  ) {}

  execute(options: IListArtifactDTO): Promise<Artifact[]> {
    const artifacts = this.artifactRepository.list(options);

    return artifacts;
  }
}

export { ListArtifactUseCase };
