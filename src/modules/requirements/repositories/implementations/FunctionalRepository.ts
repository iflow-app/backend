import { getRepository, Repository } from "typeorm";

import { AppError } from "../../../../errors/AppError";
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
      throw new AppError(`Invalid key ${level_type} to update a Functional!`);
    }
  }
}

export { FunctionalRepository };
