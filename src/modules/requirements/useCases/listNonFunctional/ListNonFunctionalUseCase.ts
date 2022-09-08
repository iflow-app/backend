import { inject, injectable } from "tsyringe";

import { IListNonFunctionalDTO } from "../../dtos/IListNonFunctionalDTO";
import { NonFunctional } from "../../entities/NonFunctional";
import { INonFunctionalRepository } from "../../repositories/INonFunctionalRepository";

@injectable()
class ListNonFunctionalUseCase {
  constructor(
    @inject("NonFunctionalRepository")
    private nonFunctionalRepository: INonFunctionalRepository
  ) {}

  async execute(options: IListNonFunctionalDTO): Promise<NonFunctional[]> {
    const nonFuntionalList = await this.nonFunctionalRepository.list(options);

    return nonFuntionalList;
  }
}

export { ListNonFunctionalUseCase };
