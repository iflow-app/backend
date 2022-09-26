import { Requirement } from "../entities/Requirement";

interface ICreateNonFunctionalDTO {
  requirement: Requirement;
  artifact_id?: string;
}

export { ICreateNonFunctionalDTO };
