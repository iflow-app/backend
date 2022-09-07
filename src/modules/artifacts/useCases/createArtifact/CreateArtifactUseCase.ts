import { inject, injectable } from "tsyringe";

import { ICreateArtifactDTO } from "../../dtos/ICreateArtifactDTO";
import { Artifact } from "../../entities/Artifact";
import { IArtifactRepository } from "../../repositories/IArtifactRepository";

@injectable()
class CreateArtifactUseCase {
  constructor(
    @inject("ArtifactRepository")
    private artifactRepository: IArtifactRepository
  ) {}

  async execute({
    name,
    stage,
    project_id,
  }: ICreateArtifactDTO): Promise<Artifact> {
    const artifact = await this.artifactRepository.create({
      name,
      stage,
      project_id,
    });

    return artifact;
  }
}

export { CreateArtifactUseCase };
