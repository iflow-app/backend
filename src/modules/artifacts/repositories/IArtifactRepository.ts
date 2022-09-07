import { ICreateArtifactDTO } from "../dtos/ICreateArtifactDTO";
import { Artifact } from "../entities/Artifact";

interface IArtifactRepository {
  create(data: ICreateArtifactDTO): Promise<Artifact>;
}

export { IArtifactRepository };
