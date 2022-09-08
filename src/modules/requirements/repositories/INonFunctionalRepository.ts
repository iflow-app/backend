import { IUpdateNonFunctionalDTO } from "../dtos/IUpdateNonFunctionalDTO";
import { NonFunctional } from "../entities/NonFunctional";
import { Requirement } from "../entities/Requirement";

interface INonFunctionalRepository {
  create(requirement: Requirement): Promise<NonFunctional>;
  update(data: IUpdateNonFunctionalDTO): Promise<boolean>;
}

export { INonFunctionalRepository };
