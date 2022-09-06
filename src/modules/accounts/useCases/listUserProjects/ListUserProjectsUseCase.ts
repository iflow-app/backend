import { inject, injectable } from "tsyringe";

import { Project } from "../../entities/Project";
import { IUserRepository } from "../../repositories/IUserRepository";

@injectable()
class ListUserProjectsUseCase {
  constructor(
    @inject("UserRepository")
    private userRepository: IUserRepository
  ) {}

  async execute(user_id: string): Promise<Project[]> {
    const projects = this.userRepository.findProjects(user_id);

    return projects;
  }
}

export { ListUserProjectsUseCase };
