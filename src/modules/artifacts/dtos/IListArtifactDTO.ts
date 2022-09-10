interface IListArtifactDTO {
  artifact_id: string;
  project?: boolean;
  project_id?: string;
  evolve?: boolean;
  contents?: boolean;
  requirements?: boolean;
  verifications?: boolean;
}

export { IListArtifactDTO };
