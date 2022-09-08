/* eslint-disable no-use-before-define */
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
  OneToMany,
} from "typeorm";

import { HouseOfQuality } from "./HouseOfQuality";
import { Requirement } from "./Requirement";

enum NonFunctionalPriorityEnum {
  One = "one",
  Two = "two",
  Three = "three",
}

@Entity()
class NonFunctional {
  @PrimaryGeneratedColumn("increment")
  nfunctional_id: number;

  @Column({ type: "enum", enum: NonFunctionalPriorityEnum, nullable: true })
  priority: string;

  @Column({ nullable: true })
  nfr_links_id?: number;

  @Column()
  requirement_id: string;

  @OneToOne(() => Requirement, { nullable: false })
  @JoinColumn({ name: "requirement_id" })
  requirement: Requirement;

  @OneToOne(() => NonFunctional, { nullable: true })
  @JoinColumn({ name: "nfr_links_id" })
  nfr_links?: NonFunctional;

  @OneToMany(
    () => HouseOfQuality,
    (houseOfQuality) => houseOfQuality.nfunctional_id
  )
  house_of_quality?: HouseOfQuality[];
}

export { NonFunctional, NonFunctionalPriorityEnum };
