import { getRepository, ObjectLiteral, Repository } from "typeorm";

import { AppError } from "../../../../errors/AppError";
import { nestedFilter } from "../../../../utils/filters";
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

  async addBacklogRelation({
    functional_id1,
    functional_id2,
  }: ICreateBacklogRelationDTO): Promise<Functional> {
    const [functional1, functional2] = await this.repository.findByIds(
      [functional_id1, functional_id2],
      { relations: ["backlog_relations"], order: { level_type: "ASC" } }
    );

    if (!functional1 || !functional2) {
      throw new AppError("One or both passed ids does not exists!");
    }

    if (
      functional1.backlog_relations.some(
        (functional) => functional.functional_id === functional_id2
      )
    ) {
      throw new AppError("Relation already exists!");
    }

    functional1.backlog_relations.push(functional2);

    const functional = await this.repository.save(functional1);

    return functional;
  }

  async list({
    backlog,
    requirement,
    level_type,
    artifact_id,
    project_id,
  }: IListFunctionalDTO): Promise<Functional[]> {
    const requirementFilters = {
      ...(!!artifact_id && { artifact_id }),
      ...(!!project_id && { project_id }),
    };
    const where: ObjectLiteral = {
      ...(!!requirementFilters && { requirement: requirementFilters }),
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
}

export { FunctionalRepository };
