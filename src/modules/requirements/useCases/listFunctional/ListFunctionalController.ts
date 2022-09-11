import { Request, Response } from "express";
import { container } from "tsyringe";

import { IListFunctionalDTO } from "../../dtos/IListFunctionalDTO";
import { Functional } from "../../entities/Functional";
import { ListFunctionalUseCase } from "./ListFunctionalUseCase";

class ListFunctionalController {
  async handle(
    request: Request,
    response: Response
  ): Promise<Response<Functional[]>> {
    const { backlog, requirement, level_type, artifact_id, project_id } =
      request.query as unknown as IListFunctionalDTO;

    const listFunctionalUseCase = container.resolve(ListFunctionalUseCase);

    const functionalList = await listFunctionalUseCase.execute({
      backlog,
      requirement,
      level_type,
      artifact_id,
      project_id,
    });

    return response.status(200).json(functionalList);
  }
}

export { ListFunctionalController };
