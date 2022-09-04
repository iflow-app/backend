import {
  Entity,
  Column,
  ManyToOne,
  JoinColumn,
  PrimaryGeneratedColumn,
} from "typeorm";
import { v4 as uuidV4 } from "uuid";

import { Verification } from "./Verification";

enum CheckpointResultTypeEnum {
  Boolean = "boolean",
  Int = "int",
  Text = "text",
}

@Entity()
class Checkpoint {
  @PrimaryGeneratedColumn("uuid")
  checkpoint_id: string;

  @Column("text")
  result: string;

  @Column({ type: "enum", enum: CheckpointResultTypeEnum })
  result_type: string;

  @Column("text")
  criteria: string;

  @ManyToOne(() => Verification, { nullable: false })
  @JoinColumn({
    name: "verification_id",
    referencedColumnName: "verification_id",
  })
  verification_id: Verification;

  constructor() {
    if (!this.checkpoint_id) {
      this.checkpoint_id = uuidV4();
    }
  }
}

export { Checkpoint, CheckpointResultTypeEnum };
