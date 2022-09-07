import { Functional } from "../entities/Functional";
import { Requirement } from "../entities/Requirement";

interface IFunctionalRepository {
  create(requirement: Requirement): Promise<Functional>;
}

export { IFunctionalRepository };
