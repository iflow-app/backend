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

@Entity()
class NonFunctional {
  @PrimaryGeneratedColumn("increment")
  nfunctional_id: number;

  @Column("smallint")
  priority: string;

  @Column({ nullable: true })
  nfr_links_id?: string;

  @OneToOne(() => Requirement, { nullable: false })
  @JoinColumn({ name: "requirement_id" })
  requirement_id: Requirement;

  @OneToOne(() => NonFunctional, { nullable: true })
  @JoinColumn({ name: "nfr_links_id" })
  nfr_links?: NonFunctional;

  @OneToMany(
    () => HouseOfQuality,
    (houseOfQuality) => houseOfQuality.nfunctional_id
  )
  house_of_quality?: HouseOfQuality[];
}

export { NonFunctional };
