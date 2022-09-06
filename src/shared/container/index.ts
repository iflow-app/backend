import { container } from "tsyringe";

import { ProjectRepository } from "../../modules/accounts/repositories/implementations/ProjectRepository";
import { UserRepository } from "../../modules/accounts/repositories/implementations/UserRepository";
import { IProjectRepository } from "../../modules/accounts/repositories/IProjectRepository";
import { IUserRepository } from "../../modules/accounts/repositories/IUserRepository";

container.registerSingleton<IUserRepository>("UserRepository", UserRepository);

container.registerSingleton<IProjectRepository>(
  "ProjectRepository",
  ProjectRepository
);
