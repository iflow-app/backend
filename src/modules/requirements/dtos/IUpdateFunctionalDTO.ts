import { FunctionalLevelTypeEnum } from "../entities/Functional";

interface IUpdateFunctionalDTO {
  level_type: FunctionalLevelTypeEnum;
  functional_id: number;
}

export { IUpdateFunctionalDTO };
