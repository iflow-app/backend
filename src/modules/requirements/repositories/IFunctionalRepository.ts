import { ICreateBacklogRelationDTO } from "../dtos/ICreateBacklogRelationDTO";
import { ICreateFunctionalDTO } from "../dtos/ICreateFunctionalDTO";
import { IListFunctionalDTO } from "../dtos/IListFunctionalDTO";
import { IUpdateFunctionalDTO } from "../dtos/IUpdateFunctionalDTO";
import { Functional } from "../entities/Functional";
import { Requirement } from "../entities/Requirement";

interface IFunctionalRepository {
  create(requirement: ICreateFunctionalDTO): Promise<Functional>;
  update(data: IUpdateFunctionalDTO): Promise<boolean>;
  addBacklogRelation(data: ICreateBacklogRelationDTO[]): Promise<void>;
  list(options: IListFunctionalDTO): Promise<Functional[]>;
  isUserStory(functional_id: number): Promise<boolean>;
}

export { IFunctionalRepository };
