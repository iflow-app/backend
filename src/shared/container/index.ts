import { container } from "tsyringe";

import { ProjectRepository } from "../../modules/accounts/repositories/implementations/ProjectRepository";
import { UserRepository } from "../../modules/accounts/repositories/implementations/UserRepository";
import { IProjectRepository } from "../../modules/accounts/repositories/IProjectRepository";
import { IUserRepository } from "../../modules/accounts/repositories/IUserRepository";
import { IArtifactRepository } from "../../modules/artifacts/repositories/IArtifactRepository";
import { IContentRepository } from "../../modules/artifacts/repositories/IContentRepository";
import { ArtifactRepository } from "../../modules/artifacts/repositories/implementations/ArtifactRepository";
import { ContentRepository } from "../../modules/artifacts/repositories/implementations/ContentRepository";
import { IFunctionalRepository } from "../../modules/requirements/repositories/IFunctionalRepository";
import { FunctionalRepository } from "../../modules/requirements/repositories/implementations/FunctionalRepository";
import { RequirementRepository } from "../../modules/requirements/repositories/implementations/RequirementRepository";
import { IRequirementRepository } from "../../modules/requirements/repositories/IRequirementRepository";

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

container.registerSingleton<IRequirementRepository>(
  "RequirementRepository",
  RequirementRepository
);

container.registerSingleton<IFunctionalRepository>(
  "FunctionalRepository",
  FunctionalRepository
);
