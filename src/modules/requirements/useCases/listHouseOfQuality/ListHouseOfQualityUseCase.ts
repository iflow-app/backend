import { inject, injectable } from "tsyringe";

import { IListHouseOfQualityDTO } from "../../dtos/IListHouseOfQualityDTO";
import { HouseOfQuality } from "../../entities/HouseOfQuality";
import { IHouseOfQualityRepository } from "../../repositories/IHouseOfQualityRepository";

@injectable()
class ListHouseOfQualityUseCase {
  constructor(
    @inject("HouseOfQualityRepository")
    private houseOfQualityRepository: IHouseOfQualityRepository
  ) {}

  async execute(options: IListHouseOfQualityDTO): Promise<HouseOfQuality[]> {
    const houseOfQualityList = await this.houseOfQualityRepository.list(
      options
    );

    return houseOfQualityList;
  }
}

export { ListHouseOfQualityUseCase };
