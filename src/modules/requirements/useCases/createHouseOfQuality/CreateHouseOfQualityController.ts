import { Request, Response } from "express";
import { container } from "tsyringe";

import { ICreateHouseOfQualityDTO } from "../../dtos/ICreateHouseOfQualityDTO";
import { CreateHouseOfQualityUseCase } from "./CreateHouseOfQualityUseCase";

class CreateHouseOfQualityController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { functional_id, nfunctional_id, weight }: ICreateHouseOfQualityDTO =
      request.body;

    const createHouseOfQualityUseCase = container.resolve(
      CreateHouseOfQualityUseCase
    );

    const houseOfQuality = await createHouseOfQualityUseCase.execute({
      functional_id,
      nfunctional_id,
      weight,
    });

    return response.status(201).json(houseOfQuality);
  }
}

export { CreateHouseOfQualityController };
