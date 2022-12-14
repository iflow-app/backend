import { container } from "tsyringe";

import { ProjectRepository } from "../../modules/accounts/repositories/implementations/ProjectRepository";
import { UserRepository } from "../../modules/accounts/repositories/implementations/UserRepository";
import { UserTokenRepository } from "../../modules/accounts/repositories/implementations/UserTokenRepository";
import { IProjectRepository } from "../../modules/accounts/repositories/IProjectRepository";
import { IUserRepository } from "../../modules/accounts/repositories/IUserRepository";
import { IUserTokenRepository } from "../../modules/accounts/repositories/IUserTokenRepository";
import { IArtifactRepository } from "../../modules/artifacts/repositories/IArtifactRepository";
import { IContentRepository } from "../../modules/artifacts/repositories/IContentRepository";
import { ArtifactRepository } from "../../modules/artifacts/repositories/implementations/ArtifactRepository";
import { ContentRepository } from "../../modules/artifacts/repositories/implementations/ContentRepository";
import { IFunctionalRepository } from "../../modules/requirements/repositories/IFunctionalRepository";
import { IHouseOfQualityRepository } from "../../modules/requirements/repositories/IHouseOfQualityRepository";
import { FunctionalRepository } from "../../modules/requirements/repositories/implementations/FunctionalRepository";
import { HouseOfQualityRepository } from "../../modules/requirements/repositories/implementations/HouseOfQualityRepository";
import { NonFunctionalRepository } from "../../modules/requirements/repositories/implementations/NonFunctionalRepository";
import { RequirementRepository } from "../../modules/requirements/repositories/implementations/RequirementRepository";
import { INonFunctionalRepository } from "../../modules/requirements/repositories/INonFunctionalRepository";
import { IRequirementRepository } from "../../modules/requirements/repositories/IRequirementRepository";
import { ICheckpointRepository } from "../../modules/verifications/repositories/ICheckpointRepository";
import { CheckpointRepository } from "../../modules/verifications/repositories/implementations/CheckpointRepository";
import { VerificationRepository } from "../../modules/verifications/repositories/implementations/VerificationRepository";
import { IVerificationRepository } from "../../modules/verifications/repositories/IVerificationRepository";
import { IDateProvider } from "./providers/DateProvider/IDateProvider";
import { DaysjDateProvider } from "./providers/DateProvider/implementations/DayjsDateProvider";
import { DijkstraProvider } from "./providers/SingleShortestPathProvider/implementations/DijkstraProvider";
import { ISingleShortestPathProvider } from "./providers/SingleShortestPathProvider/ISingleShortestPathProvider";
import { LocalStorageProvider } from "./providers/StorageProvider/implementations/LocalStorageProvider";
import { IStorageProvider } from "./providers/StorageProvider/IStorageProvider";

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

container.registerSingleton<INonFunctionalRepository>(
  "NonFunctionalRepository",
  NonFunctionalRepository
);

container.registerSingleton<IHouseOfQualityRepository>(
  "HouseOfQualityRepository",
  HouseOfQualityRepository
);

container.registerSingleton<IVerificationRepository>(
  "VerificationRepository",
  VerificationRepository
);

container.registerSingleton<ICheckpointRepository>(
  "CheckpointRepository",
  CheckpointRepository
);

const diskStorage = {
  local: LocalStorageProvider,
};

container.registerSingleton<IStorageProvider>(
  "StorageProvider",
  diskStorage[process.env.disk]
);

container.registerSingleton<IUserTokenRepository>(
  "UserTokenRepository",
  UserTokenRepository
);

container.registerSingleton<IDateProvider>(
  "DayjsDateProvider",
  DaysjDateProvider
);

container.registerSingleton<ISingleShortestPathProvider>(
  "DijkstraProvider",
  DijkstraProvider
);
