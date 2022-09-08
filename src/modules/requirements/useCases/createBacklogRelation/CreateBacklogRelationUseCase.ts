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
  async;
  async execute({
    functional_id1,
    functional_id2,
  }: ICreateBacklogRelationDTO): Promise<Functional> {
    const functional = await this.functionalRepository.addBacklogRelation({
      functional_id1,
      functional_id2,
    });

    return functional;
  }
}

export { CreateBacklogRelationUseCase };
