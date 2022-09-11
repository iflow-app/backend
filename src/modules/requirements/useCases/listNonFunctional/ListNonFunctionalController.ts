import { Request, Response } from "express";
import { container } from "tsyringe";

import { IListNonFunctionalDTO } from "../../dtos/IListNonFunctionalDTO";
import { NonFunctional } from "../../entities/NonFunctional";
import { ListNonFunctionalUseCase } from "./ListNonFunctionalUseCase";

class ListNonFunctionalController {
  async handle(
    request: Request,
    response: Response
  ): Promise<Response<NonFunctional[]>> {
    const { nfr, priority, requirement, artifact_id, project_id } =
      request.query as unknown as IListNonFunctionalDTO;

    const listNonFunctionalUseCase = container.resolve(
      ListNonFunctionalUseCase
    );

    const nonFunctionalList = await listNonFunctionalUseCase.execute({
      nfr,
      priority,
      requirement,
      artifact_id,
      project_id,
    });

    return response.status(200).json(nonFunctionalList);
  }
}

export { ListNonFunctionalController };
