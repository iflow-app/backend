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

  @Column("bytea")
  content: string;

  @Column()
  type: string;

  @ManyToOne(() => Artifact, { nullable: false })
  @JoinColumn({ name: "artifact_id" })
  artifact_id: Artifact;

  constructor() {
    if (!this.content_id) {
      this.content_id = uuidV4();
    }
  }
}

export { Content };
