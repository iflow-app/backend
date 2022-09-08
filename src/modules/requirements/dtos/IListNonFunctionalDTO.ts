import { NonFunctionalPriorityEnum } from "../entities/NonFunctional";
import { IListRequirementDTO } from "./IListRequirementDTO";

interface IListNonFunctionalDTO extends IListRequirementDTO {
  requirement?: boolean;
  nfr?: boolean;
  priority?: NonFunctionalPriorityEnum;
}

export { IListNonFunctionalDTO };
