import { inject, injectable } from "tsyringe";

import { IStorageProvider } from "../../../../shared/container/providers/IStorageProvider";
import { IContentResponseDTO } from "../../dtos/IContentResponseDTO";
import { ICreateContentDTO } from "../../dtos/ICreateContentDTO";
import { ContentMap } from "../../mapper/ContentMap";
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
  }: ICreateContentDTO): Promise<IContentResponseDTO> {
    await this.storageProvider.save(path, "/content");

    const content = await this.contentRepository.create({
      path,
      type,
      artifact_id,
    });

    return ContentMap.toDTO(content);
  }
}

export { CreateContentUseCase };
