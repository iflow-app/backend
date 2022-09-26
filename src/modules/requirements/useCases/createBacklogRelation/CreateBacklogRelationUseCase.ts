import { inject, injectable } from "tsyringe";

import { ICreateBacklogRelationDTO } from "../../dtos/ICreateBacklogRelationDTO";
import { Functional } from "../../entities/Functional";
import { IFunctionalRepository } from "../../repositories/IFunctionalRepository";

@injectable()
class CreateBacklogRelationUseCase {
  constructor(
    @inject("FunctionalRepository")
    private functionalRepository: IFunctionalRepository
  ) {}

  async execute(data: ICreateBacklogRelationDTO[]): Promise<void> {
    await this.functionalRepository.addBacklogRelation(data);
  }
}

export { CreateBacklogRelationUseCase };
