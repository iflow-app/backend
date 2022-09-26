import { Requirement } from "../entities/Requirement";

interface ICreateFunctionalDTO {
  requirement: Requirement;
  artifact_id?: string;
}

export { ICreateFunctionalDTO };
