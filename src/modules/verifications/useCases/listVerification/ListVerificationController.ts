import { Request, Response } from "express";
import { container } from "tsyringe";

import { IListVerificationDTO } from "../../dtos/IListVerificationDTO";
import { Verification } from "../../entities/Verification";
import { ListVerificationUseCase } from "./ListVerificationUseCase";

class ListVerificationController {
  async handle(
    request: Request,
    response: Response
  ): Promise<Response<Verification[]>> {
    const { checkpoints, artifact, artifact_id, project_id, verification_id } =
      request.query as unknown as IListVerificationDTO;

    const listVerificationsUseCase = container.resolve(ListVerificationUseCase);

    const verifications = await listVerificationsUseCase.execute({
      checkpoints,
      artifact,
      artifact_id,
      project_id,
      verification_id,
    });

    return response.status(200).json(verifications);
  }
}

export { ListVerificationController };
