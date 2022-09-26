/* eslint-disable no-use-before-define */
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
  OneToMany,
  ManyToMany,
  JoinTable,
  ManyToOne,
} from "typeorm";

import { Artifact } from "../../artifacts/entities/Artifact";
import { HouseOfQuality } from "./HouseOfQuality";
import { Requirement } from "./Requirement";

enum FunctionalLevelTypeEnum {
  Epic = "epic",
  Feature = "feature",
  UserStory = "user story",
}

@Entity()
class Functional {
  @PrimaryGeneratedColumn("increment")
  functional_id: number;

  @Column({
    type: "enum",
    enum: FunctionalLevelTypeEnum,
    nullable: true,
  })
  level_type: string;

  @Column({ nullable: true })
  artifact_id?: string;

  @Column({ nullable: false })
  requirement_id: string;

  @ManyToOne(() => Artifact, { nullable: true })
  @JoinColumn({ name: "artifact_id", referencedColumnName: "artifact_id" })
  artifact: Artifact;

  @OneToOne(() => Requirement, { nullable: false })
  @JoinColumn({ name: "requirement_id" })
  requirement: Requirement;

  @ManyToMany(() => Functional)
  @JoinTable({ name: "backlog" })
  backlog_relations: Functional[];

  @OneToMany(
    () => HouseOfQuality,
    (house_of_quality) => house_of_quality.functional_id
  )
  house_of_quality?: HouseOfQuality[];
}

export { Functional, FunctionalLevelTypeEnum };
