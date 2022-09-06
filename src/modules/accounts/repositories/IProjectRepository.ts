import { ICreateProjectDTO } from "../dtos/ICreateProjectDTO";
import { Project } from "../entities/Project";

interface IProjectRepository {
  create(data: ICreateProjectDTO): Promise<Project>;
}

export { IProjectRepository };
