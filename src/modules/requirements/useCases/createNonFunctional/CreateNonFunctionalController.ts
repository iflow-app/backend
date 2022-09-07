import { Request, Response } from "express";
import { container } from "tsyringe";

import { ICreateRequirementDTO } from "../../dtos/ICreateRequirementDTO";
import { CreateNonFunctionalUseCase } from "./CreateNonFunctionalUseCase";

class CreateNonFunctionalController {
  async handle(request: Request, response: Response): Promise<Response> {
    const {
      name,
      what,
      who,
      why,
      project_id,
      artifact_id,
    }: ICreateRequirementDTO = request.body;

    const createNonFunctionalUseCase = container.resolve(
      CreateNonFunctionalUseCase
    );

    const nonFunctional = await createNonFunctionalUseCase.execute({
      name,
      what,
      who,
      why,
      project_id,
      artifact_id,
    });

    return response.status(201).json(nonFunctional);
  }
}

export { CreateNonFunctionalController };
