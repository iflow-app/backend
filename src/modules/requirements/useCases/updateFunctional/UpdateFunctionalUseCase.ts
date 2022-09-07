import { inject, injectable } from "tsyringe";

import { IUpdateFunctionalDTO } from "../../dtos/IUpdateFunctionalDTO";
import { IFunctionalRepository } from "../../repositories/IFunctionalRepository";

@injectable()
class UpdateFunctionalUseCase {
  constructor(
    @inject("FunctionalRepository")
    private functionalRepository: IFunctionalRepository
  ) {}

  async execute({
    functional_id,
    level_type,
  }: IUpdateFunctionalDTO): Promise<boolean> {
    const updated = await this.functionalRepository.update({
      functional_id,
      level_type,
    });

    return updated;
  }
}

export { UpdateFunctionalUseCase };
