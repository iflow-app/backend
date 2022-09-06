import { inject, injectable } from "tsyringe";

import { ICreateProjectDTO } from "../../dtos/ICreateProjectDTO";
import { Project } from "../../entities/Project";
import { IProjectRepository } from "../../repositories/IProjectRepository";

@injectable()
class CreateProjectUseCase {
  constructor(
    @inject("ProjectRepository")
    private projectRepository: IProjectRepository
  ) {}

  async execute({
    name,
    objective,
    description,
    user_id,
  }: ICreateProjectDTO): Promise<Project> {
    const project = await this.projectRepository.create({
      name,
      objective,
      description,
      user_id,
    });

    return project;
  }
}

export { CreateProjectUseCase };
