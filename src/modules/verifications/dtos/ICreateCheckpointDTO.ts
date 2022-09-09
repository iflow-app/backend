import { CheckpointResultTypeEnum } from "../entities/Checkpoint";

interface ICreateCheckpointDTO {
  result_type: CheckpointResultTypeEnum;
  result: string;
  criteria: string;
  verification_id: string;
}

export { ICreateCheckpointDTO };
