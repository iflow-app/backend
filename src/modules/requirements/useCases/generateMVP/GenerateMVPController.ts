import { Request, Response } from "express";
import { container } from "tsyringe";

import { GenerateMVPUseCase } from "./GenerateMVPUseCase";

class GenerateMVPController {
  async handle(request: Request, response: Response): Promise<Response> {
    const generateMVPUseCase = container.resolve(GenerateMVPUseCase);

    const functionalIds = await generateMVPUseCase.execute();

    return response.status(200).json(functionalIds);
  }
}

export { GenerateMVPController };
