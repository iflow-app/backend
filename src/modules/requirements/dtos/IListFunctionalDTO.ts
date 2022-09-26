import { FunctionalLevelTypeEnum } from "../entities/Functional";
import { IListRequirementDTO } from "./IListRequirementDTO";

interface IListFunctionalDTO extends IListRequirementDTO {
  requirement?: boolean;
  backlog?: boolean;
  level_type?: FunctionalLevelTypeEnum;
  artifact_id?: string;
}

export { IListFunctionalDTO };
