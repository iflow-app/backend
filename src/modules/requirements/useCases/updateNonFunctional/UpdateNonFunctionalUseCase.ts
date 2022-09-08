import { inject, injectable } from "tsyringe";

import { IUpdateNonFunctionalDTO } from "../../dtos/IUpdateNonFunctionalDTO";
import { INonFunctionalRepository } from "../../repositories/INonFunctionalRepository";

@injectable()
class UpdateNonFunctionalUseCase {
  constructor(
    @inject("NonFunctionalRepository")
    private nonFunctionalRepository: INonFunctionalRepository
  ) {}

  async execute({
    nfunctional_id,
    nfr_links_id,
    priority,
  }: IUpdateNonFunctionalDTO): Promise<boolean> {
    const updated = await this.nonFunctionalRepository.update({
      nfunctional_id,
      nfr_links_id,
      priority,
    });

    return updated;
  }
}

export { UpdateNonFunctionalUseCase };
