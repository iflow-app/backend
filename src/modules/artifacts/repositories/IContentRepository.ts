import { ICreateContentDTO } from "../dtos/ICreateContentDTO";
import { Content } from "../entities/Content";

interface IContentRepository {
  create(data: ICreateContentDTO): Promise<Content>;
}

export { IContentRepository };
