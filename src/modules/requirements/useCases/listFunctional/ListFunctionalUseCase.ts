import { inject, injectable } from "tsyringe";

import { IListFunctionalDTO } from "../../dtos/IListFunctionalDTO";
import { Functional } from "../../entities/Functional";
import { IFunctionalRepository } from "../../repositories/IFunctionalRepository";

@injectable()
class ListFunctionalUseCase {
  constructor(
    @inject("FunctionalRepository")
    private functionalRepository: IFunctionalRepository
  ) {}

  async execute(options: IListFunctionalDTO): Promise<Functional[]> {
    const functionalList = await this.functionalRepository.list(options);

    return functionalList;
  }
}

export { ListFunctionalUseCase };
