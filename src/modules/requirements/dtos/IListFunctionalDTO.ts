import { FunctionalLevelTypeEnum } from "../entities/Functional";

interface IListFunctionalDTO {
  requirement?: boolean;
  backlog?: boolean;
  level_type?: FunctionalLevelTypeEnum;
}

export { IListFunctionalDTO };
