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

import { Project } from "../../accounts/entities/Project";
import { Functional } from "../../requirements/entities/Functional";
import { NonFunctional } from "../../requirements/entities/NonFunctional";
import { Requirement } from "../../requirements/entities/Requirement";
import { Verification } from "../../verifications/entities/Verification";
import { Content } from "./Content";

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

  @Column()
  project_id: string;

  @Column({ nullable: true })
  evolve_id?: string;

  @ManyToOne(() => Project, { nullable: false })
  @JoinColumn({ name: "project_id" })
  project: Project;

  @OneToMany(() => Content, (content) => content.artifact)
  contents: Content[];

  @ManyToOne(() => Artifact, { nullable: true })
  @JoinColumn({ name: "evolve_id" })
  evolve?: Artifact;

  @OneToMany(() => Artifact, (artifact) => artifact.evolve)
  evolved_id?: Artifact[];

  @OneToMany(() => Functional, (functional) => functional.artifact)
  functionals: Functional[];

  @OneToMany(() => NonFunctional, (nonFunctional) => nonFunctional.artifact)
  non_functionals: NonFunctional[];

  @OneToMany(() => Verification, (verification) => verification.artifact)
  verifications: Verification[];

  constructor() {
    if (!this.artifact_id) {
      this.artifact_id = uuidV4();
    }
  }
}

export { Artifact, ArtifactStageEnum };
