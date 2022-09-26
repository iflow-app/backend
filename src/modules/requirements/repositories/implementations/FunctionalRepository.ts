import { getRepository, ObjectLiteral, Repository } from "typeorm";

import { AppError } from "../../../../shared/errors/AppError";
import { nestedFilter, requirementsFilters } from "../../../../utils/filters";
import { ICreateBacklogRelationDTO } from "../../dtos/ICreateBacklogRelationDTO";
import { IListFunctionalDTO } from "../../dtos/IListFunctionalDTO";
import { IUpdateFunctionalDTO } from "../../dtos/IUpdateFunctionalDTO";
import { Functional, FunctionalLevelTypeEnum } from "../../entities/Functional";
import { Requirement } from "../../entities/Requirement";
import { IFunctionalRepository } from "../IFunctionalRepository";

class FunctionalRepository implements IFunctionalRepository {
  private repository: Repository<Functional>;

  constructor() {
    this.repository = getRepository(Functional);
  }

  async create(requirement: Requirement): Promise<Functional> {
    const functional = this.repository.create({});

    functional.requirement = requirement;

    try {
      const functionalRow = await this.repository.save(functional);

      return functionalRow;
    } catch {
      throw new AppError("Data malformed to create a Functional");
    }
  }

  async update({
    functional_id,
    level_type,
  }: IUpdateFunctionalDTO): Promise<boolean> {
    try {
      const { affected } = await this.repository.update(
        { functional_id },
        { level_type }
      );

      return !!affected;
    } catch {
      throw new AppError(`Invalid key [${level_type}] to update a Functional!`);
    }
  }

  async addBacklogRelation(data: ICreateBacklogRelationDTO[]): Promise<void> {
    await Promise.all(
      data.map(async (epic) => {
        await this.update({
          functional_id: epic.epic_id,
          level_type: FunctionalLevelTypeEnum.Epic,
        });

        const epicRow = await this.repository.findOne(epic.epic_id, {
          relations: ["backlog_relations"],
        });

        await Promise.all(
          epic.features.map(async ({ feature_id, userStories }) => {
            await this.update({
              functional_id: feature_id,
              level_type: FunctionalLevelTypeEnum.Feature,
            });

            const featureRow = await this.repository.findOne(feature_id, {
              relations: ["backlog_relations"],
            });

            epicRow.backlog_relations.push(featureRow);
            await Promise.all(
              userStories.map(async (userStoryId) => {
                await this.update({
                  functional_id: userStoryId,
                  level_type: FunctionalLevelTypeEnum.UserStory,
                });

                const userStoryRow = await this.repository.findOne(
                  userStoryId,
                  {
                    relations: ["backlog_relations"],
                  }
                );

                featureRow.backlog_relations.push(userStoryRow);
              })
            );

            await this.repository.save(featureRow);
          })
        );

        await this.repository.save(epicRow);
      })
    );
  }

  async list({
    backlog,
    requirement,
    level_type,
    artifact_id,
    project_id,
  }: IListFunctionalDTO): Promise<Functional[]> {
    const requirementFilters = requirementsFilters({ artifact_id, project_id });

    const where: ObjectLiteral = {
      ...(!!requirementFilters && requirementFilters),
      ...(!!level_type && { level_type }),
    };

    let relations: string[] = [
      ...(Object.keys(requirementFilters).length > 0 || requirement
        ? ["requirement"]
        : []),
    ];

    if (backlog) {
      relations = relations.concat(
        nestedFilter(
          "backlog_relations",
          Object.values(FunctionalLevelTypeEnum).indexOf(level_type)
        )
      );
    }

    if (requirement && backlog) {
      relations = relations.concat(
        nestedFilter(
          "backlog_relations.requirement",
          Object.values(FunctionalLevelTypeEnum).indexOf(level_type)
        )
      );
    }

    const functionalList = await this.repository.find({
      relations,
      where,
    });

    return functionalList;
  }

  async isUserStory(functional_id: number): Promise<boolean> {
    const functional = await this.repository.findOne({
      where: { functional_id, level_type: FunctionalLevelTypeEnum.UserStory },
    });

    return !!functional;
  }
}

export { FunctionalRepository };
