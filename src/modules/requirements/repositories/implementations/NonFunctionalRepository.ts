import { getRepository, Repository } from "typeorm";

import { AppError } from "../../../../errors/AppError";
import { IUpdateNonFunctionalDTO } from "../../dtos/IUpdateNonFunctionalDTO";
import {
  NonFunctional,
  NonFunctionalPriorityEnum,
} from "../../entities/NonFunctional";
import { Requirement } from "../../entities/Requirement";
import { INonFunctionalRepository } from "../INonFunctionalRepository";

class NonFunctionalRepository implements INonFunctionalRepository {
  private repository: Repository<NonFunctional>;

  constructor() {
    this.repository = getRepository(NonFunctional);
  }

  async create(requirement: Requirement): Promise<NonFunctional> {
    const nonFunctional = this.repository.create({});

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
}

export { NonFunctionalRepository };
