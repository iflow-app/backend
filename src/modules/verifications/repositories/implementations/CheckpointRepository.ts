import { getRepository, Repository } from "typeorm";

import { AppError } from "../../../../shared/errors/AppError";
import { ICreateCheckpointDTO } from "../../dtos/ICreateCheckpointDTO";
import { Checkpoint } from "../../entities/Checkpoint";
import { ICheckpointRepository } from "../ICheckpointRepository";

class CheckpointRepository implements ICheckpointRepository {
  private repository: Repository<Checkpoint>;

  constructor() {
    this.repository = getRepository(Checkpoint);
  }

  async create({
    result_type,
    result,
    criteria,
    verification_id,
  }: ICreateCheckpointDTO): Promise<Checkpoint> {
    const checkpoint = this.repository.create({
      result_type,
      result,
      criteria,
      verification_id,
    });

    try {
      const checkpointRow = await this.repository.save(checkpoint);

      return checkpointRow;
    } catch {
      throw new AppError("Data malformed to create a Checkpoint");
    }
  }
}

export { CheckpointRepository };
