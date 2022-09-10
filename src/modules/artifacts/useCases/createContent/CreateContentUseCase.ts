import { inject, injectable } from "tsyringe";

import { IStorageProvider } from "../../../../shared/container/providers/IStorageProvider";
import { ICreateContentDTO } from "../../dtos/ICreateContentDTO";
import { Content } from "../../entities/Content";
import { IContentRepository } from "../../repositories/IContentRepository";

@injectable()
class CreateContentUseCase {
  constructor(
    @inject("ContentRepository")
    private contentRepository: IContentRepository,
    @inject("StorageProvider")
    private storageProvider: IStorageProvider
  ) {}

  async execute({
    path,
    type,
    artifact_id,
  }: ICreateContentDTO): Promise<Content> {
    await this.storageProvider.save(path, "/content");

    const project = this.contentRepository.create({ path, type, artifact_id });

    return project;
  }
}

export { CreateContentUseCase };
