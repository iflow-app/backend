interface IContentResponseDTO {
  type: string;
  artifact_id: string;
  content_url(): string;
}

export { IContentResponseDTO };
