import { ICreateRequirementDTO } from "../dtos/ICreateRequirementDTO";
import { Requirement } from "../entities/Requirement";

interface IRequirementRepository {
  create(data: ICreateRequirementDTO): Promise<Requirement>;
}

export { IRequirementRepository };
