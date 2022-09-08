import { FunctionalLevelTypeEnum } from "../entities/Functional";

interface IListFunctionalDTO {
  requirement?: boolean;
  backlog?: boolean;
  level_type?: FunctionalLevelTypeEnum;
  project_id?: string;
  artifact_id?: string;
}

export { IListFunctionalDTO };
