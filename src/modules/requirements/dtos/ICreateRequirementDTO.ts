interface ICreateRequirementDTO {
  name: string;
  who: string;
  what: string;
  why: string;
  project_id: string;
  artifact_id?: string;
}

export { ICreateRequirementDTO };
