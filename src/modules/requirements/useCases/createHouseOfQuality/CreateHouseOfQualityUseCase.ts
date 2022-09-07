import { inject, injectable } from "tsyringe";

import { ICreateHouseOfQualityDTO } from "../../dtos/ICreateHouseOfQualityDTO";
import { HouseOfQuality } from "../../entities/HouseOfQuality";
import { IHouseOfQualityRepository } from "../../repositories/IHouseOfQualityRepository";

@injectable()
class CreateHouseOfQualityUseCase {
  constructor(
    @inject("HouseOfQualityRepository")
    private houseOfQualityRepository: IHouseOfQualityRepository
  ) {}

  async execute({
    functional_id,
    nfunctional_id,
    weight,
  }: ICreateHouseOfQualityDTO): Promise<HouseOfQuality> {
    const houseOfQuality = await this.houseOfQualityRepository.create({
      functional_id,
      nfunctional_id,
      weight,
    });

    return houseOfQuality;
  }
}

export { CreateHouseOfQualityUseCase };
