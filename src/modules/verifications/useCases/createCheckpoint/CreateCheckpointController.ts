import { Request, Response } from "express";
import { container } from "tsyringe";

import { ICreateCheckpointDTO } from "../../dtos/ICreateCheckpointDTO";
import { Checkpoint } from "../../entities/Checkpoint";
import { CreateCheckpointUseCase } from "./CreateCheckpointUseCase";

class CreateCheckpointController {
  async handle(
    request: Request<never, never, ICreateCheckpointDTO>,
    response: Response
  ): Promise<Response<Checkpoint>> {
    const { result, result_type, criteria, verification_id } = request.body;

    const createCheckpointUseCase = container.resolve(CreateCheckpointUseCase);

    const artifact = await createCheckpointUseCase.execute({
      result,
      result_type,
      criteria,
      verification_id,
    });

    return response.status(201).json(artifact);
  }
}

export { CreateCheckpointController };
