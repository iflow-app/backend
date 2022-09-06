import { getRepository, Repository } from "typeorm";

import { ICreateContentDTO } from "../../dtos/ICreateContentDTO";
import { Content } from "../../entities/Content";
import { IContentRepository } from "../IContentRepository";

class ContentRepository implements IContentRepository {
  private repository: Repository<Content>;

  constructor() {
    this.repository = getRepository(Content);
  }

  async create({
    path,
    type,
    artifact_id,
  }: ICreateContentDTO): Promise<Content> {
    const content = this.repository.create({ path, type, artifact_id });

    const contentRow = await this.repository.save(content);

    return contentRow;
  }
}

export { ContentRepository };
