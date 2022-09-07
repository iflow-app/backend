import { getRepository, Repository } from "typeorm";

import { AppError } from "../../../../errors/AppError";
import { NonFunctional } from "../../entities/NonFunctional";
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
}

export { NonFunctionalRepository };
