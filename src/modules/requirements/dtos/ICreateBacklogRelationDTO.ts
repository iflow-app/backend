interface IFeatureRelation {
  feature_id: number;
  userStories: Array<number>;
}

interface ICreateBacklogRelationDTO {
  epic_id: number;
  features: IFeatureRelation[];
}

export { ICreateBacklogRelationDTO, IFeatureRelation };
