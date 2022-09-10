import { getRepository, ObjectLiteral, Repository } from "typeorm";

import { AppError } from "../../../../shared/errors/AppError";
import { ICreateArtifactDTO } from "../../dtos/ICreateArtifactDTO";
import { IListArtifactDTO } from "../../dtos/IListArtifactDTO";
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

  async list({
    artifact_id,
    project_id,
    contents,
    evolve,
    project,
    requirements,
    verifications,
  }: IListArtifactDTO): Promise<Artifact[]> {
    const where: ObjectLiteral = {
      ...(!!artifact_id && { artifact_id }),
      ...(!!project_id && { project_id }),
    };

    const relations = [
      ...(contents ? ["contents"] : []),
      ...(evolve ? ["evolve"] : []),
      ...(project ? ["project"] : []),
      ...(requirements ? ["requirements"] : []),
      ...(verifications ? ["verifications"] : []),
    ];

    const artifacts = await this.repository.find({
      where,
      relations,
    });

    return artifacts;
  }
}

export { ArtifactRepository };
