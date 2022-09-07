import { container, inject, injectable } from "tsyringe";

import { ICreateRequirementDTO } from "../../dtos/ICreateRequirementDTO";
import { NonFunctional } from "../../entities/NonFunctional";
import { INonFunctionalRepository } from "../../repositories/INonFunctionalRepository";
import { CreateRequirementUseCase } from "../createRequirement/CreateRequirementUseCase";

@injectable()
class CreateNonFunctionalUseCase {
  constructor(
    @inject("NonFunctionalRepository")
    private nonFunctionalRepository: INonFunctionalRepository
  ) {}

  async execute({
    name,
    what,
    who,
    why,
    project_id,
    artifact_id,
  }: ICreateRequirementDTO): Promise<NonFunctional> {
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

    const nonFunctional = await this.nonFunctionalRepository.create(
      requirement
    );

    return nonFunctional;
  }
}

export { CreateNonFunctionalUseCase };
