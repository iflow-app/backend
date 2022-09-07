import { Request, Response } from "express";
import { container } from "tsyringe";

import { ICreateRequirementDTO } from "../../dtos/ICreateRequirementDTO";
import { CreateFunctionalUseCase } from "./CreateFunctionalUseCase";

class CreateFunctionalController {
  async handle(request: Request, response: Response): Promise<Response> {
    const {
      name,
      what,
      who,
      why,
      project_id,
      artifact_id,
    }: ICreateRequirementDTO = request.body;

    const createFunctionalUseCase = container.resolve(CreateFunctionalUseCase);

    const functional = await createFunctionalUseCase.execute({
      name,
      what,
      who,
      why,
      project_id,
      artifact_id,
    });

    return response.status(201).json(functional);
  }
}

export { CreateFunctionalController };
