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
@Unique(["nfr_links"])
@Unique(["requirement_id", "identifier"])
class NonFunctional {
  @PrimaryGeneratedColumn("uuid")
  nfunctional_id: string;

  @Column()
  identifier: string;

  @Column("smallint")
  priority: string;

  @Column({ nullable: true })
  nfr_links_id?: string;

  @OneToOne(() => Requirement, { nullable: false })
  @JoinColumn({ name: "requirement_id" })
  requirement_id: Requirement;

  @ManyToOne(() => NonFunctional, { nullable: true })
  @JoinColumn({ name: "nfr_links_id" })
  nfr_links?: NonFunctional;

  @OneToMany(() => NonFunctional, (functional) => functional.nfr_links)
  nfr_linked?: NonFunctional[];

  @OneToMany(
    () => HouseOfQuality,
    (houseOfQuality) => houseOfQuality.nfunctional_id
  )
  house_of_quality?: HouseOfQuality[];

  constructor() {
    if (!this.nfunctional_id) {
      this.nfunctional_id = uuidV4();
    }
  }
}

export { NonFunctional };
