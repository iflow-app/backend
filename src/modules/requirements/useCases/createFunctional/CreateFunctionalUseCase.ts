import { container, inject, injectable } from "tsyringe";

import { ICreateRequirementDTO } from "../../dtos/ICreateRequirementDTO";
import { Functional } from "../../entities/Functional";
import { IFunctionalRepository } from "../../repositories/IFunctionalRepository";
import { CreateRequirementUseCase } from "../createRequirement/CreateRequirementUseCase";

@injectable()
class CreateFunctionalUseCase {
  constructor(
    @inject("FunctionalRepository")
    private functionalRepository: IFunctionalRepository
  ) {}

  async execute({
    name,
    what,
    who,
    why,
    project_id,
    artifact_id,
  }: ICreateRequirementDTO): Promise<Functional> {
    const createRequirementUseCase = container.resolve(
      CreateRequirementUseCase
    );

    const requirement = await createRequirementUseCase.execute({
      name,
      what,
      who,
      why,
      project_id,
      artifact_id,
    });

    const functional = this.functionalRepository.create(requirement);

    return functional;
  }
}

export { CreateFunctionalUseCase };
