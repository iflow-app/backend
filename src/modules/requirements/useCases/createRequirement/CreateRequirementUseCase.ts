import { inject, injectable } from "tsyringe";

import { ICreateRequirementDTO } from "../../dtos/ICreateRequirementDTO";
import { Requirement } from "../../entities/Requirement";
import { IRequirementRepository } from "../../repositories/IRequirementRepository";

@injectable()
class CreateRequirementUseCase {
  constructor(
    @inject("RequirementRepository")
    private requirementRepository: IRequirementRepository
  ) {}

  async execute({
    name,
    what,
    who,
    why,
    project_id,
    artifact_id,
  }: ICreateRequirementDTO): Promise<Requirement> {
    const requirement = await this.requirementRepository.create({
      name,
      what,
      who,
      why,
      project_id,
      artifact_id,
    });

    return requirement;
  }
}

export { CreateRequirementUseCase };
