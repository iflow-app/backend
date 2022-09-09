import { inject, injectable } from "tsyringe";

import { ICreateVerificationDTO } from "../../dtos/ICreateVerificationDTO";
import { Verification } from "../../entities/Verification";
import { IVerificationRepository } from "../../repositories/IVerificationRepository";

@injectable()
class CreateVerificationUseCase {
  constructor(
    @inject("VerificationRepository")
    private verificationRepository: IVerificationRepository
  ) {}

  async execute({
    name,
    artifact_id,
  }: ICreateVerificationDTO): Promise<Verification> {
    const verification = await this.verificationRepository.create({
      name,
      artifact_id,
    });

    return verification;
  }
}

export { CreateVerificationUseCase };
