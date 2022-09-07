import { ICreateHouseOfQualityDTO } from "../dtos/ICreateHouseOfQualityDTO";
import { HouseOfQuality } from "../entities/HouseOfQuality";

interface IHouseOfQualityRepository {
  create(data: ICreateHouseOfQualityDTO): Promise<HouseOfQuality>;
}

export { IHouseOfQualityRepository };
