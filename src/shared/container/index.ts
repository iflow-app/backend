import { container } from "tsyringe";

import { ProjectRepository } from "../../modules/accounts/repositories/implementations/ProjectRepository";
import { UserRepository } from "../../modules/accounts/repositories/implementations/UserRepository";
import { IProjectRepository } from "../../modules/accounts/repositories/IProjectRepository";
import { IUserRepository } from "../../modules/accounts/repositories/IUserRepository";
import { IArtifactRepository } from "../../modules/artifacts/repositories/IArtifactRepository";
import { IContentRepository } from "../../modules/artifacts/repositories/IContentRepository";
import { ArtifactRepository } from "../../modules/artifacts/repositories/implementations/ArtifactRepository";
import { ContentRepository } from "../../modules/artifacts/repositories/implementations/ContentRepository";

container.registerSingleton<IUserRepository>("UserRepository", UserRepository);

container.registerSingleton<IProjectRepository>(
  "ProjectRepository",
  ProjectRepository
);

container.registerSingleton<IContentRepository>(
  "ContentRepository",
  ContentRepository
);

container.registerSingleton<IArtifactRepository>(
  "ArtifactRepository",
  ArtifactRepository
);
