import { ICreateCheckpointDTO } from "../dtos/ICreateCheckpointDTO";
import { Checkpoint } from "../entities/Checkpoint";

interface ICheckpointRepository {
  create(data: ICreateCheckpointDTO): Promise<Checkpoint>;
}

export { ICheckpointRepository };
