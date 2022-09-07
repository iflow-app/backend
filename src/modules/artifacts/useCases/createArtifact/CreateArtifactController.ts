import { Request, Response } from "express";
import { container } from "tsyringe";

import { CreateArtifactUseCase } from "./CreateArtifactUseCase";

class CreateArtifactController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { name, stage, project_id } = request.body;

    const createArtifactUseCase = container.resolve(CreateArtifactUseCase);

    const artifact = await createArtifactUseCase.execute({
      name,
      stage,
      project_id,
    });

    return response.status(201).json(artifact);
  }
}

export { CreateArtifactController };
