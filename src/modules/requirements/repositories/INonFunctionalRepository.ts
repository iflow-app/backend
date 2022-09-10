import { IListNonFunctionalDTO } from "../dtos/IListNonFunctionalDTO";
import { IUpdateNonFunctionalDTO } from "../dtos/IUpdateNonFunctionalDTO";
import { NonFunctional } from "../entities/NonFunctional";
import { Requirement } from "../entities/Requirement";

interface INonFunctionalRepository {
  create(requirement: Requirement): Promise<NonFunctional>;
  update(data: IUpdateNonFunctionalDTO): Promise<boolean>;
  list(options: IListNonFunctionalDTO): Promise<NonFunctional[]>;
  isHighPriority(nfunctional_id: number): Promise<boolean>;
}

export { INonFunctionalRepository };
