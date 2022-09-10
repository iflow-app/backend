import { getRepository, ObjectLiteral, Repository } from "typeorm";

import { AppError } from "../../../../shared/errors/AppError";
import { ICreateVerificationDTO } from "../../dtos/ICreateVerificationDTO";
import { IListVerificationDTO } from "../../dtos/IListVerificationDTO";
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

  async list({
    checkpoints,
    artifact,
    verification_id,
    artifact_id,
    project_id,
  }: IListVerificationDTO): Promise<Verification[]> {
    const where: ObjectLiteral = {
      ...(!!verification_id && { verification_id }),
      ...(!!artifact_id && { artifact_id }),
      ...(!!project_id && { artifact: { artifact_id } }),
    };

    const relations = [
      ...(checkpoints ? ["checkpoints"] : []),
      ...(artifact ? ["artifact"] : []),
    ];

    const verifications = await this.repository.find({
      relations,
      where,
    });

    return verifications;
  }
}

export { VerificationRepository };
