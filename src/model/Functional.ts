/* eslint-disable no-use-before-define */
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
  ManyToOne,
  OneToMany,
  Unique,
} from "typeorm";
import { v4 as uuidV4 } from "uuid";

import { HouseOfQuality } from "./HouseOfQuality";
import { Requirement } from "./Requirement";

enum FunctionalLevelTypeEnum {
  Epic = "epic",
  Feature = "feature",
  UserStory = "user story",
}

@Entity()
@Unique(["requirement_id", "identifier"])
class Functional {
  @PrimaryGeneratedColumn("uuid")
  functional_id: string;

  @Column({
    type: "enum",
    enum: FunctionalLevelTypeEnum,
  })
  level_type: string;

  @Column()
  identifier: string;

  @Column()
  name: string;

  @OneToOne(() => Requirement, { nullable: false })
  @JoinColumn({ name: "requirement_id" })
  requirement_id: Requirement;

  @ManyToOne(() => Functional, { nullable: true })
  @JoinColumn({ name: "backlog_links" })
  backlog_links?: Functional;

  @OneToMany(() => Functional, (functional) => functional.backlog_links)
  backlog_linked?: Functional[];

  @OneToMany(
    () => HouseOfQuality,
    (house_of_quality) => house_of_quality.functional_id
  )
  house_of_quality?: HouseOfQuality[];

  constructor() {
    if (!this.functional_id) {
      this.functional_id = uuidV4();
    }
  }
}

export { Functional, FunctionalLevelTypeEnum };
