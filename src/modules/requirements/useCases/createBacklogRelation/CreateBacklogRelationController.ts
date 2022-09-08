import { Request, Response } from "express";
import { container } from "tsyringe";

import { Functional } from "../../entities/Functional";
import { CreateBacklogRelationUseCase } from "./CreateBacklogRelationUseCase";

interface IRequestParams {
  functional_id: number;
}

interface IRequestBody {
  functional_id: number;
}

class CreateBacklogRelationController {
  async handle(
    request: Request<IRequestParams, never, IRequestBody>,
    response: Response
  ): Promise<Response<Functional>> {
    const { functional_id: functional_id1 } = request.params;
    const { functional_id: functional_id2 } = request.body;

    const createBacklogRelationUseCase = container.resolve(
      CreateBacklogRelationUseCase
    );

    const functional = await createBacklogRelationUseCase.execute({
      functional_id1,
      functional_id2,
    });

    return response.status(200).json(functional);
  }
}

export { CreateBacklogRelationController };
