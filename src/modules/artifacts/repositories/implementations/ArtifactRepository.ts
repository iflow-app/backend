import { getRepository, Repository } from "typeorm";

import { AppError } from "../../../../errors/AppError";
import { ICreateArtifactDTO } from "../../dtos/ICreateArtifactDTO";
import { Artifact } from "../../entities/Artifact";
import { IArtifactRepository } from "../IArtifactRepository";

class ArtifactRepository implements IArtifactRepository {
  private repository: Repository<Artifact>;

  constructor() {
    this.repository = getRepository(Artifact);
  }

  async create({
    name,
    stage,
    project_id,
  }: ICreateArtifactDTO): Promise<Artifact> {
    const artifact = this.repository.create({
      name,
      stage,
      project_id,
    });

    try {
      const artifactRow = await this.repository.save(artifact);

      return artifactRow;
    } catch {
      throw new AppError("Data malformed to create Artifact!");
    }
  }
}

export { ArtifactRepository };
