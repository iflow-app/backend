import { ICreateBacklogRelationDTO } from "../dtos/ICreateBacklogRelationDTO";
import { IUpdateFunctionalDTO } from "../dtos/IUpdateFunctionalDTO";
import { Functional } from "../entities/Functional";
import { Requirement } from "../entities/Requirement";

interface IFunctionalRepository {
  create(requirement: Requirement): Promise<Functional>;
  update(data: IUpdateFunctionalDTO): Promise<boolean>;
  addBacklogRelation(data: ICreateBacklogRelationDTO): Promise<Functional>;
}

export { IFunctionalRepository };
