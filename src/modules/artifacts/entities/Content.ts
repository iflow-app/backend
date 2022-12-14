import { Expose } from "class-transformer";
import {
  Entity,
  Column,
  ManyToOne,
  JoinColumn,
  PrimaryGeneratedColumn,
} from "typeorm";
import { v4 as uuidV4 } from "uuid";

import { Artifact } from "./Artifact";

@Entity()
class Content {
  @PrimaryGeneratedColumn("uuid")
  content_id: string;

  @Column("text")
  path: string;

  @Column()
  type: string;

  @Column()
  artifact_id: string;

  @ManyToOne(() => Artifact, { nullable: false })
  @JoinColumn({ name: "artifact_id" })
  artifact: Artifact;

  @Expose({ name: "content_url" })
  content_url(): string {
    switch (process.env.disk) {
      case "local":
        return `${process.env.APP_API_URL}/files/content/${this.path}`;
      default:
        return null;
    }
  }

  constructor() {
    if (!this.content_id) {
      this.content_id = uuidV4();
    }
  }
}

export { Content };
