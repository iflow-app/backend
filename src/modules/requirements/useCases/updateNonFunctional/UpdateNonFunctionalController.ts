import { Request, Response } from "express";
import { container } from "tsyringe";

import { NonFunctionalPriorityEnum } from "../../entities/NonFunctional";
import { UpdateNonFunctionalUseCase } from "./UpdateNonFunctionalUseCase";

interface IRequestParams {
  nfunctional_id: number;
}

interface IRequestBody {
  nfr_links_id?: number;
  priority?: NonFunctionalPriorityEnum;
}

interface IResponse {
  updated: boolean;
}

class UpdateNonFunctionalController {
  async handle(
    request: Request<IRequestParams, never, IRequestBody>,
    response: Response
  ): Promise<Response<IResponse>> {
    const { nfunctional_id } = request.params;
    const { nfr_links_id, priority } = request.body;

    const updateNonFunctionalUseCase = container.resolve(
      UpdateNonFunctionalUseCase
    );

    const updated = await updateNonFunctionalUseCase.execute({
      nfunctional_id,
      nfr_links_id,
      priority,
    });

    return response.status(200).json({ updated });
  }
}

export { UpdateNonFunctionalController };
