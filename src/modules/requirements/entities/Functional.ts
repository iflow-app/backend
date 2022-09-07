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
} from "typeorm";

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
  functional_id: string;

  @Column({
    type: "enum",
    enum: FunctionalLevelTypeEnum,
    nullable: true,
  })
  level_type: string;

  @Column({ nullable: false })
  requirement_id: string;

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
