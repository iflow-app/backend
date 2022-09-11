import { Request, Response } from "express";
import { container } from "tsyringe";

import { UpdateNonFunctionalUseCase } from "./UpdateNonFunctionalUseCase";

interface IRequestParams {
  nfunctional_id: number;
}

interface IResponse {
  updated: boolean;
}

class UpdateNonFunctionalController {
  async handle(
    request: Request,
    response: Response
  ): Promise<Response<IResponse>> {
    const { nfunctional_id } = request.params as unknown as IRequestParams;
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
