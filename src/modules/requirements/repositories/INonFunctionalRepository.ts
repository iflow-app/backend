import { NonFunctional } from "../entities/NonFunctional";
import { Requirement } from "../entities/Requirement";

interface INonFunctionalRepository {
  create(requirement: Requirement): Promise<NonFunctional>;
}

export { INonFunctionalRepository };
