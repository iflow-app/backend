import { ICreateArtifactDTO } from "../dtos/ICreateArtifactDTO";
import { IListArtifactDTO } from "../dtos/IListArtifactDTO";
import { Artifact } from "../entities/Artifact";

interface IArtifactRepository {
  create(data: ICreateArtifactDTO): Promise<Artifact>;
  list(options: IListArtifactDTO): Promise<Artifact[]>;
}

export { IArtifactRepository };
