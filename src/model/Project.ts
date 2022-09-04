import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from "typeorm";
import { v4 as uuidV4 } from "uuid";

import { Artifact } from "./Artifact";
import { Lexical } from "./Lexical";
import { Requirement } from "./Requirement";
import { User } from "./User";

@Entity()
class Project {
  @PrimaryGeneratedColumn("uuid")
  project_id: string;

  @Column()
  name: string;

  @Column("text")
  description: string;

  @Column("text")
  objective: string;

  @ManyToOne(() => User, { nullable: false })
  @JoinColumn({ name: "user_id" })
  user_id: User;

  @OneToMany(() => Artifact, (artifact) => artifact.project_id)
  artifacts: Artifact[];

  @OneToMany(() => Requirement, (requirement) => requirement.project_id)
  requirements: Requirement[];

  @OneToMany(() => Lexical, (lexical) => lexical.project_id)
  lexical: Lexical[];

  constructor() {
    if (!this.project_id) {
      this.project_id = uuidV4();
    }
  }
}

export { Project };
