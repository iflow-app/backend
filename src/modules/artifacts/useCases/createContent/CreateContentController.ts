import { Request, Response } from "express";
import { container } from "tsyringe";

import { AppError } from "../../../../shared/errors/AppError";
import { CreateContentUseCase } from "./CreateContentUseCase";

class CreateContentController {
  async handle(request: Request, response: Response): Promise<Response> {
    if (request.file === undefined) {
      throw new AppError("File extension not allowed!");
    }

    const { filename: path } = request.file;
    const { type, artifact_id } = request.body;

    const createContentUseCase = container.resolve(CreateContentUseCase);

    const content = await createContentUseCase.execute({
      path,
      type,
      artifact_id,
    });

    return response.status(201).json(content);
  }
}

export { CreateContentController };
