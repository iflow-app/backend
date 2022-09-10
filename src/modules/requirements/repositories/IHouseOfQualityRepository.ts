import { ICreateHouseOfQualityDTO } from "../dtos/ICreateHouseOfQualityDTO";
import { IListHouseOfQualityDTO } from "../dtos/IListHouseOfQualityDTO";
import { HouseOfQuality } from "../entities/HouseOfQuality";

interface IHouseOfQualityRepository {
  create(data: ICreateHouseOfQualityDTO): Promise<HouseOfQuality>;
  list(options: IListHouseOfQualityDTO): Promise<HouseOfQuality[]>;
}

export { IHouseOfQualityRepository };
