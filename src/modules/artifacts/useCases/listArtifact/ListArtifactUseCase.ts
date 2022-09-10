import { inject, injectable } from "tsyringe";

import { IArtifactResponseDTO } from "../../dtos/IArtifactResponseDTO";
import { IListArtifactDTO } from "../../dtos/IListArtifactDTO";
import { ArtifactMap } from "../../mapper/ArtifactMap";
import { IArtifactRepository } from "../../repositories/IArtifactRepository";

@injectable()
class ListArtifactUseCase {
  constructor(
    @inject("ArtifactRepository")
    private artifactRepository: IArtifactRepository
  ) {}

  async execute(options: IListArtifactDTO): Promise<IArtifactResponseDTO[]> {
    const artifacts = await this.artifactRepository.list(options);

    const artifactsResponse = artifacts.map((artifact) =>
      ArtifactMap.toDTO(artifact)
    );

    return artifactsResponse;
  }
}

export { ListArtifactUseCase };
