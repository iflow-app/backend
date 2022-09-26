import { Request, Response } from "express";
import { container } from "tsyringe";

import { CreateBacklogRelationUseCase } from "./CreateBacklogRelationUseCase";

class CreateBacklogRelationController {
  async handle(request: Request, response: Response): Promise<Response> {
    const data = request.body;

    const createBacklogRelationUseCase = container.resolve(
      CreateBacklogRelationUseCase
    );

    await createBacklogRelationUseCase.execute(data);

    return response.status(201).send();
  }
}

export { CreateBacklogRelationController };
