import { getRepository, Repository } from "typeorm";

import { AppError } from "../../../../shared/errors/AppError";
import { ICreateRequirementDTO } from "../../dtos/ICreateRequirementDTO";
import { Requirement } from "../../entities/Requirement";
import { IRequirementRepository } from "../IRequirementRepository";

class RequirementRepository implements IRequirementRepository {
  private repository: Repository<Requirement>;

  constructor() {
    this.repository = getRepository(Requirement);
  }

  async create({
    name,
    what,
    who,
    why,
    project_id,
  }: ICreateRequirementDTO): Promise<Requirement> {
    const requirement = this.repository.create({
      name,
      what,
      who,
      why,
      project_id,
    });

    try {
      const requirementRow = await this.repository.save(requirement);

      return requirementRow;
    } catch {
      throw new AppError("Data malformed to create a Requirement");
    }
  }
}

export { RequirementRepository };
