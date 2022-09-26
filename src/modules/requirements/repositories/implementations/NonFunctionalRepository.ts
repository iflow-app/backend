import { getRepository, ObjectLiteral, Repository } from "typeorm";

import { AppError } from "../../../../shared/errors/AppError";
import { nestedFilter, requirementsFilters } from "../../../../utils/filters";
import { ICreateNonFunctionalDTO } from "../../dtos/ICreateNonFunctionaDTO";
import { IListNonFunctionalDTO } from "../../dtos/IListNonFunctionalDTO";
import { IUpdateNonFunctionalDTO } from "../../dtos/IUpdateNonFunctionalDTO";
import {
  NonFunctional,
  NonFunctionalPriorityEnum,
} from "../../entities/NonFunctional";
import { INonFunctionalRepository } from "../INonFunctionalRepository";

class NonFunctionalRepository implements INonFunctionalRepository {
  private repository: Repository<NonFunctional>;

  constructor() {
    this.repository = getRepository(NonFunctional);
  }

  async create({
    requirement,
    artifact_id,
  }: ICreateNonFunctionalDTO): Promise<NonFunctional> {
    const nonFunctional = this.repository.create({ artifact_id });

    nonFunctional.requirement = requirement;

    try {
      const nonFunctionalRow = this.repository.save(nonFunctional);

      return nonFunctionalRow;
    } catch {
      throw new AppError("Data malformed to create a Non Functional!");
    }
  }

  async update({
    nfunctional_id,
    nfr_links_id,
    priority,
  }: IUpdateNonFunctionalDTO): Promise<boolean> {
    try {
      const { affected } = await this.repository.update(
        { nfunctional_id },
        { nfr_links_id, priority }
      );

      return !!affected;
    } catch {
      if (!(priority in NonFunctionalPriorityEnum)) {
        throw new AppError(`Invalid key [${priority}] for priority!`);
      }

      throw new AppError("Invalid key for nfr_links_id!");
    }
  }

  async list({
    requirement,
    nfr,
    priority,
    artifact_id,
    project_id,
  }: IListNonFunctionalDTO): Promise<NonFunctional[]> {
    const requirementFilters = requirementsFilters({ project_id });

    const where: ObjectLiteral = {
      ...(!!requirementFilters && requirementFilters),
      ...(!!priority && { priority }),
      ...(!!artifact_id && { artifact_id }),
    };

    let relations: string[] = [
      ...(Object.keys(requirementFilters).length > 0 || requirement
        ? ["requirement"]
        : []),
    ];

    if (nfr) {
      relations = relations.concat(
        nestedFilter(
          "nfr_links",
          Object.values(NonFunctionalPriorityEnum).indexOf(priority)
        )
      );
    }

    if (requirement && nfr) {
      relations = relations.concat(
        nestedFilter(
          "nfr_links.requirement",
          Object.values(NonFunctionalPriorityEnum).indexOf(priority)
        )
      );
    }

    const nonFunctionalList = await this.repository.find({
      relations,
      where,
    });

    return nonFunctionalList;
  }

  async isHighPriority(nfunctional_id: number): Promise<boolean> {
    const nonFunctional = await this.repository.findOne({
      where: { nfunctional_id, priority: NonFunctionalPriorityEnum.Three },
    });

    return !!nonFunctional;
  }
}

export { NonFunctionalRepository };
