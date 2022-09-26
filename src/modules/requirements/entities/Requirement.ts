import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { v4 as uuidV4 } from "uuid";

import { Project } from "../../accounts/entities/Project";

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

  @Column()
  project_id: string;

  @ManyToOne(() => Project, { nullable: false })
  @JoinColumn({ name: "project_id" })
  project: Project;

  constructor() {
    if (!this.requirement_id) {
      this.requirement_id = uuidV4();
    }
  }
}

export { Requirement };
