import { Request, Response } from "express";
import { container } from "tsyringe";

import { UpdateFunctionalUseCase } from "./UpdateFunctionalUseCase";

interface IRequestFunctionalUpdate {
  functional_id: number;
}

interface IResponse {
  updated: boolean;
}

class UpdateFunctionalController {
  async handle(
    request: Request<IRequestFunctionalUpdate>,
    response: Response
  ): Promise<Response<IResponse>> {
    const { functional_id } = request.params;
    const { level_type } = request.body;

    const updateFunctionalUseCase = container.resolve(UpdateFunctionalUseCase);

    const updated = await updateFunctionalUseCase.execute({
      functional_id,
      level_type,
    });

    return response.status(200).json({ updated });
  }
}

export { UpdateFunctionalController };
