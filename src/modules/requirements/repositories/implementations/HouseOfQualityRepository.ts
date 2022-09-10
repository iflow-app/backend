import { getRepository, ObjectLiteral, Repository } from "typeorm";

import { AppError } from "../../../../shared/errors/AppError";
import { ICreateHouseOfQualityDTO } from "../../dtos/ICreateHouseOfQualityDTO";
import { IListHouseOfQualityDTO } from "../../dtos/IListHouseOfQualityDTO";
import { HouseOfQuality } from "../../entities/HouseOfQuality";
import { IHouseOfQualityRepository } from "../IHouseOfQualityRepository";

class HouseOfQualityRepository implements IHouseOfQualityRepository {
  private repository: Repository<HouseOfQuality>;

  constructor() {
    this.repository = getRepository(HouseOfQuality);
  }

  async create({
    functional_id,
    nfunctional_id,
    weight,
  }: ICreateHouseOfQualityDTO): Promise<HouseOfQuality> {
    const houseOfQuality = this.repository.create({
      functional_id,
      nfunctional_id,
      weight,
    });

    try {
      const houseOfQualityRow = await this.repository.save(houseOfQuality);

      return houseOfQualityRow;
    } catch {
      throw new AppError(
        "Data malformed to create a relation House of Quality"
      );
    }
  }

  async list({
    functional_id,
    nfunctional_id,
    weight,
  }: IListHouseOfQualityDTO): Promise<HouseOfQuality[]> {
    const where: ObjectLiteral = {
      ...(!!functional_id && { functional_id }),
      ...(!!nfunctional_id && { nfunctional_id }),
      ...(!!weight && { weight }),
    };

    const houseOfQualityList = await this.repository.find({
      where,
    });

    return houseOfQualityList;
  }
}

export { HouseOfQualityRepository };
