/* eslint-disable no-use-before-define */
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from "typeorm";
import { v4 as uuidV4 } from "uuid";

import { Content } from "./Content";
import { Project } from "./Project";
import { Requirement } from "./Requirement";
import { Verification } from "./Verification";

enum ArtifactStageEnum {
  PreTracebility = "pre-traceability",
  Elicitation = "elicitation",
}

@Entity()
class Artifact {
  @PrimaryGeneratedColumn("uuid")
  artifact_id: string;

  @Column()
  name: string;

  @Column({
    type: "enum",
    enum: ArtifactStageEnum,
  })
  stage: string;

  @Column("text")
  objective: string;

  @ManyToOne(() => Project, { nullable: false })
  @JoinColumn({ name: "project_id" })
  project_id: Project;

  @OneToMany(() => Content, (content) => content.artifact_id)
  contents: Content[];

  @ManyToOne(() => Artifact, { nullable: true })
  @JoinColumn({ name: "evolve_id" })
  evolve_id?: Artifact;

  @OneToMany(() => Artifact, (artifact) => artifact.evolve_id)
  evolved_id?: Artifact[];

  @OneToMany(() => Requirement, (requirement) => requirement.artifact_id)
  requirements: Requirement[];

  @OneToMany(() => Verification, (verification) => verification.artifact_id)
  verifications: Verification[];

  constructor() {
    if (!this.artifact_id) {
      this.artifact_id = uuidV4();
    }
  }
}

export { Artifact, ArtifactStageEnum };
