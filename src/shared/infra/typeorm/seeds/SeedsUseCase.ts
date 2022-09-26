/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
import { container, inject, injectable } from "tsyringe";

import { IProjectRepository } from "../../../../modules/accounts/repositories/IProjectRepository";
import { CreateUserUseCase } from "../../../../modules/accounts/useCases/createUser/CreateUserUseCase";
import { ICreateArtifactDTO } from "../../../../modules/artifacts/dtos/ICreateArtifactDTO";
import { IArtifactRepository } from "../../../../modules/artifacts/repositories/IArtifactRepository";
import { IUpdateNonFunctionalDTO } from "../../../../modules/requirements/dtos/IUpdateNonFunctionalDTO";
import { IFunctionalRepository } from "../../../../modules/requirements/repositories/IFunctionalRepository";
import { IHouseOfQualityRepository } from "../../../../modules/requirements/repositories/IHouseOfQualityRepository";
import { INonFunctionalRepository } from "../../../../modules/requirements/repositories/INonFunctionalRepository";
import { IRequirementRepository } from "../../../../modules/requirements/repositories/IRequirementRepository";
import { artifactsSeeds } from "./mocks/artifact";
import { backlogSeeds } from "./mocks/backlog";
import { functionalSeeds } from "./mocks/functional";
import { houseOfQualitySeeds } from "./mocks/houseOfQuality";
import { nfrSeeds } from "./mocks/nfr";
import { nonFunctionalSeeds } from "./mocks/nonFunctional";
import { projectsSeeds } from "./mocks/project";
import { usersSeeds } from "./mocks/user";

@injectable()
class SeedsUseCase {
  constructor(
    @inject("RequirementRepository")
    private requirementRepository: IRequirementRepository,
    @inject("FunctionalRepository")
    private functionalRepository: IFunctionalRepository,
    @inject("NonFunctionalRepository")
    private nonFunctionalRepository: INonFunctionalRepository,
    @inject("HouseOfQualityRepository")
    private houseOfQualityRepository: IHouseOfQualityRepository,
    @inject("ArtifactRepository")
    private artifactRepository: IArtifactRepository,
    @inject("ProjectRepository")
    private projectRepository: IProjectRepository
  ) {}

  async execute(): Promise<void> {
    const [{ user_id }] = await Promise.all(
      usersSeeds.map(async (user) => {
        const createUserUseCase = container.resolve(CreateUserUseCase);

        const newUser = await createUserUseCase.execute(user);
        return newUser;
      })
    );
    const [{ project_id }] = await Promise.all(
      projectsSeeds.map(async (project) => {
        const newProject = await this.projectRepository.create({
          ...project,
          user_id,
        });
        return newProject;
      })
    );

    const [{ artifact_id }] = await Promise.all(
      artifactsSeeds.map(async (artifact) => {
        const newArtifact = await this.artifactRepository.create({
          ...artifact,
          project_id,
        } as ICreateArtifactDTO);
        return newArtifact;
      })
    );

    for (const requirement of functionalSeeds) {
      const newRequirement = await this.requirementRepository.create({
        ...requirement,
        project_id,
      });

      await this.functionalRepository.create({
        requirement: newRequirement,
        artifact_id,
      });
    }

    await this.functionalRepository.addBacklogRelation(backlogSeeds);

    for (const requirement of nonFunctionalSeeds) {
      const newRequirement = await this.requirementRepository.create({
        ...requirement,
        project_id,
      });

      await this.nonFunctionalRepository.create({
        requirement: newRequirement,
        artifact_id,
      });
    }

    Promise.all(
      nfrSeeds.map(async (item) => {
        await this.nonFunctionalRepository.update(
          item as IUpdateNonFunctionalDTO
        );
      })
    );

    Promise.all(
      houseOfQualitySeeds.map(async (relation) => {
        await this.houseOfQualityRepository.create(relation);
      })
    );
  }
}

export { SeedsUseCase };
