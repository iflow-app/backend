import { inject, injectable } from "tsyringe";

import { ICreateCheckpointDTO } from "../../dtos/ICreateCheckpointDTO";
import { Checkpoint } from "../../entities/Checkpoint";
import { ICheckpointRepository } from "../../repositories/ICheckpointRepository";

@injectable()
class CreateCheckpointUseCase {
  constructor(
    @inject("CheckpointRepository")
    private checkpointRepository: ICheckpointRepository
  ) {}

  async execute({
    result,
    result_type,
    criteria,
    verification_id,
  }: ICreateCheckpointDTO): Promise<Checkpoint> {
    const checkpoint = await this.checkpointRepository.create({
      result,
      result_type,
      criteria,
      verification_id,
    });

    return checkpoint;
  }
}

export { CreateCheckpointUseCase };
