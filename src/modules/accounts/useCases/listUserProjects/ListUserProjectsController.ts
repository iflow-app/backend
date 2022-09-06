import { Request, Response } from "express";
import { container } from "tsyringe";

import { ListUserProjectsUseCase } from "./ListUserProjectsUseCase";

interface IRequestListUserProjectsRoute {
  user_id: string;
}

class ListUserProjectController {
  async handle(
    request: Request<IRequestListUserProjectsRoute>,
    response: Response
  ): Promise<Response> {
    const { user_id } = request.params;

    const listUserProjectsUseCase = container.resolve(ListUserProjectsUseCase);

    const projects = await listUserProjectsUseCase.execute(user_id);

    return response.status(200).json(projects);
  }
}

export { ListUserProjectController };
