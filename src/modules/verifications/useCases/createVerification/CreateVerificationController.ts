import { Request, Response } from "express";
import { container } from "tsyringe";

import { ICreateVerificationDTO } from "../../dtos/ICreateVerificationDTO";
import { Verification } from "../../entities/Verification";
import { CreateVerificationUseCase } from "./CreateVerificationUseCase";

class CreateVerificationController {
  async handle(
    request: Request<never, never, ICreateVerificationDTO>,
    response: Response
  ): Promise<Response<Verification>> {
    const { name, artifact_id } = request.body;

    const createVerificationUseCase = container.resolve(
      CreateVerificationUseCase
    );

    const verification = await createVerificationUseCase.execute({
      name,
      artifact_id,
    });

    return response.status(201).json(verification);
  }
}

export { CreateVerificationController };
