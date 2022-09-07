import { Request, Response } from "express";
import { container } from "tsyringe";

import { ICreateRequirementDTO } from "../../dtos/ICreateRequirementDTO";
import { CreateRequirementUseCase } from "./CreateRequirementUseCase";

class CreateRequirementController {
  async handle(request: Request, response: Response): Promise<Response> {
    const {
      name,
      what,
      who,
      why,
      project_id,
      artifact_id,
    }: ICreateRequirementDTO = request.body;

    const createRequirementUseCase = container.resolve(
      CreateRequirementUseCase
    );

    const artifact = await createRequirementUseCase.execute({
      name,
      what,
      who,
      why,
      project_id,
      artifact_id,
    });

    return response.status(201).json(artifact);
  }
}

export { CreateRequirementController };
