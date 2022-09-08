import { NonFunctionalPriorityEnum } from "../entities/NonFunctional";

interface IUpdateNonFunctionalDTO {
  nfunctional_id: number;
  nfr_links_id?: number;
  priority?: NonFunctionalPriorityEnum;
}

export { IUpdateNonFunctionalDTO };
