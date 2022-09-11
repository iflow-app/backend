import { Request, Response } from "express";
import { container } from "tsyringe";

import { CreateProjectUseCase } from "./CreateProjectUseCase";

class CreateProjectController {
  async handle(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;
    const { name, objective, description } = request.body;

    const createProjectUseCase = container.resolve(CreateProjectUseCase);

    const project = await createProjectUseCase.execute({
      name,
      objective,
      description,
      user_id,
    });

    return response.status(201).json(project);
  }
}

export { CreateProjectController };
