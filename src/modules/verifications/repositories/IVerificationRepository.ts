import { ICreateVerificationDTO } from "../dtos/ICreateVerificationDTO";
import { Verification } from "../entities/Verification";

interface IVerificationRepository {
  create(data: ICreateVerificationDTO): Promise<Verification>;
}

export { IVerificationRepository };
