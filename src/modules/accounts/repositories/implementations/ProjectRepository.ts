import { getRepository, Repository } from "typeorm";

import { ICreateProjectDTO } from "../../dtos/ICreateProjectDTO";
import { Project } from "../../entities/Project";
import { IProjectRepository } from "../IProjectRepository";

class ProjectRepository implements IProjectRepository {
  private repository: Repository<Project>;

  constructor() {
    this.repository = getRepository(Project);
  }

  async create({
    name,
    description,
    objective,
    user_id,
  }: ICreateProjectDTO): Promise<Project> {
    const project = this.repository.create({
      name,
      description,
      objective,
      user_id,
    });

    const projectRow = await this.repository.save(project);

    return projectRow;
  }
}

export { ProjectRepository };
