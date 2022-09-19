import { inject, injectable } from "tsyringe";

import { ISingleShortestPathProvider } from "../../../../shared/container/providers/SingleShortestPathProvider/ISingleShortestPathProvider";
import { IHouseOfQualityRepository } from "../../repositories/IHouseOfQualityRepository";

@injectable()
class GenerateMVPUseCase {
  constructor(
    @inject("HouseOfQualityRepository")
    private houseOfQualityRepository: IHouseOfQualityRepository,
    @inject("DijkstraProvider")
    private dijkstra: ISingleShortestPathProvider
  ) {}

  async execute(): Promise<number[]> {
    const houseOfQualityList = await this.houseOfQualityRepository.list({});

    const funcionalIds = this.dijkstra.run(houseOfQualityList);

    return funcionalIds;
  }
}

export { GenerateMVPUseCase };
