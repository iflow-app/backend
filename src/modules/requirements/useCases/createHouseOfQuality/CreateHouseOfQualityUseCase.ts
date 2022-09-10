import { inject, injectable } from "tsyringe";

import { AppError } from "../../../../shared/errors/AppError";
import { ICreateHouseOfQualityDTO } from "../../dtos/ICreateHouseOfQualityDTO";
import { HouseOfQuality } from "../../entities/HouseOfQuality";
import { IFunctionalRepository } from "../../repositories/IFunctionalRepository";
import { IHouseOfQualityRepository } from "../../repositories/IHouseOfQualityRepository";
import { INonFunctionalRepository } from "../../repositories/INonFunctionalRepository";

@injectable()
class CreateHouseOfQualityUseCase {
  constructor(
    @inject("HouseOfQualityRepository")
    private houseOfQualityRepository: IHouseOfQualityRepository,
    @inject("FunctionalRepository")
    private functionalRepository: IFunctionalRepository,
    @inject("NonFunctionalRepository")
    private nonFunctionalRepository: INonFunctionalRepository
  ) {}

  async execute({
    functional_id,
    nfunctional_id,
    weight,
  }: ICreateHouseOfQualityDTO): Promise<HouseOfQuality> {
    const isUserStory = await this.functionalRepository.isUserStory(
      functional_id
    );

    if (!isUserStory)
      throw new AppError(
        "To make a relation House of Quality the Functional must be a User Story"
      );

    const isHighPriority = await this.nonFunctionalRepository.isHighPriority(
      nfunctional_id
    );

    if (!isHighPriority)
      throw new AppError(
        "To make a relation House of Quality the Non Functional must be priority Three"
      );

    const houseOfQuality = await this.houseOfQualityRepository.create({
      functional_id,
      nfunctional_id,
      weight,
    });

    return houseOfQuality;
  }
}

export { CreateHouseOfQualityUseCase };
