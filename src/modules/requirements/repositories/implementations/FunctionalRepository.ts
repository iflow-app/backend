import { getRepository, Repository } from "typeorm";

import { AppError } from "../../../../errors/AppError";
import { ICreateBacklogRelationDTO } from "../../dtos/ICreateBacklogRelationDTO";
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
      { relations: ["backlog_relations"] }
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
}

export { FunctionalRepository };
