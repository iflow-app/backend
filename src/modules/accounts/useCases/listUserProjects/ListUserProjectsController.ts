import { Request, Response } from "express";
import { container } from "tsyringe";

import { ListUserProjectsUseCase } from "./ListUserProjectsUseCase";

class ListUserProjectController {
  async handle(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;

    const listUserProjectsUseCase = container.resolve(ListUserProjectsUseCase);

    const projects = await listUserProjectsUseCase.execute(user_id);

    return response.status(200).json(projects);
  }
}

export { ListUserProjectController };
