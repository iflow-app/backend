import { getRepository, Repository } from "typeorm";

import { AppError } from "../../../../shared/errors/AppError";
import { ICreateVerificationDTO } from "../../dtos/ICreateVerificationDTO";
import { Verification } from "../../entities/Verification";
import { IVerificationRepository } from "../IVerificationRepository";

class VerificationRepository implements IVerificationRepository {
  private repository: Repository<Verification>;

  constructor() {
    this.repository = getRepository(Verification);
  }

  async create({
    name,
    artifact_id,
  }: ICreateVerificationDTO): Promise<Verification> {
    const artifact = this.repository.create({ name, artifact_id });

    try {
      const artifactRow = await this.repository.save(artifact);

      return artifactRow;
    } catch {
      throw new AppError("Data malformed to create a Verification!");
    }
  }
}

export { VerificationRepository };
