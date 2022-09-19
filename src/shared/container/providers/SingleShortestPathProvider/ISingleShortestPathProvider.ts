import { HouseOfQuality } from "../../../../modules/requirements/entities/HouseOfQuality";

interface ISingleShortestPathProvider {
  run(data: HouseOfQuality[]): number[];
}

export { ISingleShortestPathProvider };
