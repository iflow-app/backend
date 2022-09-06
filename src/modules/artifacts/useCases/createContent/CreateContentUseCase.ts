import { inject, injectable } from "tsyringe";

import { ICreateContentDTO } from "../../dtos/ICreateContentDTO";
import { Content } from "../../entities/Content";
import { IContentRepository } from "../../repositories/IContentRepository";

@injectable()
class CreateContentUseCase {
  constructor(
    @inject("ContentRepository")
    private contentRepository: IContentRepository
  ) {}

  async execute({
    path,
    type,
    artifact_id,
  }: ICreateContentDTO): Promise<Content> {
    const project = this.contentRepository.create({ path, type, artifact_id });

    return project;
  }
}

export { CreateContentUseCase };
