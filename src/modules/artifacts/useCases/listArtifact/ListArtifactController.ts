import { Request, Response } from "express";
import { container } from "tsyringe";

import { IListArtifactDTO } from "../../dtos/IListArtifactDTO";
import { Artifact } from "../../entities/Artifact";
import { ListArtifactUseCase } from "./ListArtifactUseCase";

class ListArtifactController {
  async handle(
    request: Request<never, never, never, IListArtifactDTO>,
    response: Response
  ): Promise<Response<Artifact[]>> {
    const {
      artifact_id,
      project_id,
      contents,
      evolve,
      project,
      requirements,
      verifications,
    } = request.query;

    const listArtifactUseCase = container.resolve(ListArtifactUseCase);

    const artifacts = await listArtifactUseCase.execute({
      artifact_id,
      project_id,
      contents,
      evolve,
      project,
      requirements,
      verifications,
    });

    return response.status(200).json(artifacts);
  }
}

export { ListArtifactController };
