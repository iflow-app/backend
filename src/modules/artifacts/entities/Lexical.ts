import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { v4 as uuidV4 } from "uuid";

import { Project } from "../../accounts/entities/Project";

enum LexicalTypeEnum {
  Verb = "verb",
  Object = "object",
  State = "state",
}

@Entity()
class Lexical {
  @PrimaryGeneratedColumn("uuid")
  lexical_id: string;

  @Column("text")
  notion: string;

  @Column("text")
  impact: string;

  @Column({ type: "enum", enum: LexicalTypeEnum })
  type: string;

  @ManyToOne(() => Project)
  @JoinColumn({ name: "project_id" })
  project_id: Project;

  constructor() {
    if (!this.lexical_id) {
      this.lexical_id = uuidV4();
    }
  }
}

export { Lexical };
