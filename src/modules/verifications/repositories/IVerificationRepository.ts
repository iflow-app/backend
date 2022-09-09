import { ICreateVerificationDTO } from "../dtos/ICreateVerificationDTO";
import { IListVerificationDTO } from "../dtos/IListVerificationDTO";
import { Verification } from "../entities/Verification";

interface IVerificationRepository {
  create(data: ICreateVerificationDTO): Promise<Verification>;
  list(options: IListVerificationDTO): Promise<Verification[]>;
}

export { IVerificationRepository };
