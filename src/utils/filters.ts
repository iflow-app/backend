import { ObjectLiteral } from "typeorm";

import { IListRequirementDTO } from "../modules/requirements/dtos/IListRequirementDTO";

export const nestedFilter = (
  targetField: string,
  keyLevel: number
): string[] => {
  let filters: string[] = [];

  const split = targetField.split(".");
  const field = split.pop();
  const path = split.join(".");

  switch (keyLevel) {
    case 2:
      break;
    case 1:
      filters = [[path, field].filter(Boolean).join(".")];
      break;
    default:
      filters = [
        [path, field].filter(Boolean).join("."),
        [path || field, path, field].filter(Boolean).join("."),
      ];
      break;
  }

  console.log(filters);

  return filters;
};

export const requirementsFilters = ({
  artifact_id,
  project_id,
}: IListRequirementDTO) => {
  const filter = {
    ...(!!artifact_id && { artifact_id }),
    ...(!!project_id && { project_id }),
  };

  return filter ? { requirement: filter } : {};
};
