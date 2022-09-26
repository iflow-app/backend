import { Request, Response } from "express";
import { container } from "tsyringe";

import { SeedsUseCase } from "./SeedsUseCase";

class SeedController {
  async handle(request: Request, response: Response): Promise<Response> {
    const seedsUseCase = container.resolve(SeedsUseCase);

    await seedsUseCase.execute();

    return response.status(201).send();
  }
}

export { SeedController };
