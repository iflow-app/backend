import { classToClass } from "class-transformer";

import { IContentResponseDTO } from "../dtos/IContentResponseDTO";
import { Content } from "../entities/Content";

class ContentMap {
  static toDTO({
    artifact_id,
    content_url,
    type,
    path,
  }: Content): IContentResponseDTO {
    const content = classToClass({ artifact_id, path, content_url, type });

    return content;
  }
}

export { ContentMap };
