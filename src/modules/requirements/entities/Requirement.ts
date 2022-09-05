import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { v4 as uuidV4 } from "uuid";

import { Project } from "../../accounts/entities/Project";
import { Artifact } from "../../artifacts/entities/Artifact";

@Entity()
class Requirement {
  @PrimaryGeneratedColumn("uuid")
  requirement_id: string;

  @Column("text")
  name: string;

  @Column("text")
  who: string;

  @Column("text")
  what: string;

  @Column("text")
  why: string;

  @ManyToOne(() => Artifact, { nullable: true })
  @JoinColumn({ name: "artifact_id", referencedColumnName: "artifact_id" })
  artifact_id: Artifact;

  @ManyToOne(() => Project, { nullable: false })
  @JoinColumn({ name: "project_id" })
  project_id: Project;

  constructor() {
    if (!this.requirement_id) {
      this.requirement_id = uuidV4();
    }
  }
}

export { Requirement };
