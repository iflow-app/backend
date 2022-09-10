import { Request, Response } from "express";
import { container } from "tsyringe";

import { IListHouseOfQualityDTO } from "../../dtos/IListHouseOfQualityDTO";
import { HouseOfQuality } from "../../entities/HouseOfQuality";
import { ListHouseOfQualityUseCase } from "./ListHouseOfQualityUseCase";

class ListHouseOfQualityController {
  async handle(
    request: Request<never, never, never, IListHouseOfQualityDTO>,
    response: Response
  ): Promise<Response<HouseOfQuality[]>> {
    const { functional_id, nfunctional_id, weight } = request.query;

    const listHouseOfQualityUseCase = container.resolve(
      ListHouseOfQualityUseCase
    );

    const houseOfQualityList = await listHouseOfQualityUseCase.execute({
      functional_id,
      nfunctional_id,
      weight,
    });

    return response.status(200).json(houseOfQualityList);
  }
}

export { ListHouseOfQualityController };
