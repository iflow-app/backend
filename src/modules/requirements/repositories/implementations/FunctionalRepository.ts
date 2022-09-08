import { getRepository, ObjectLiteral, Repository } from "typeorm";

import { AppError } from "../../../../errors/AppError";
import { ICreateBacklogRelationDTO } from "../../dtos/ICreateBacklogRelationDTO";
import { IListFunctionalDTO } from "../../dtos/IListFunctionalDTO";
import { IUpdateFunctionalDTO } from "../../dtos/IUpdateFunctionalDTO";
import { Functional } from "../../entities/Functional";
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
  }: IListFunctionalDTO): Promise<Functional[]> {
    let relations: string[] = [];
    const where: ObjectLiteral = {};

    if (backlog) {
      switch (level_type) {
        case "user story":
          break;
        case "feature":
          relations.push("backlog_relations");
          break;
        case "epic":
          relations = relations.concat([
            "backlog_relations",
            "backlog_relations.backlog_relations",
          ]);
          break;
        default:
          relations = relations.concat([
            "backlog_relations",
            "backlog_relations.backlog_relations",
          ]);
          break;
      }
    }

    if (requirement) {
      relations.push("requirement");

      if (backlog) {
        switch (level_type) {
          case "user story":
            break;
          case "feature":
            relations.push("backlog_relations.requirement");
            break;
          default:
            relations = relations.concat([
              "backlog_relations.requirement",
              "backlog_relations.backlog_relations.requirement",
            ]);
            break;
        }
      }
    }

    if (level_type) {
      where.level_type = level_type;
    }

    const functionalList = await this.repository.find({
      relations,
      where,
    });

    return functionalList;
  }
}

export { FunctionalRepository };
