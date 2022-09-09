import { inject, injectable } from "tsyringe";

import { IListVerificationDTO } from "../../dtos/IListVerificationDTO";
import { Verification } from "../../entities/Verification";
import { IVerificationRepository } from "../../repositories/IVerificationRepository";

@injectable()
class ListVerificationUseCase {
  constructor(
    @inject("VerificationRepository")
    private verificationRepository: IVerificationRepository
  ) {}

  async execute(options: IListVerificationDTO): Promise<Verification[]> {
    const verifications = await this.verificationRepository.list(options);

    return verifications;
  }
}

export { ListVerificationUseCase };
