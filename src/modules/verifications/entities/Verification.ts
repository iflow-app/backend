import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from "typeorm";
import { v4 as uuidV4 } from "uuid";

import { Artifact } from "../../artifacts/entities/Artifact";
import { Checkpoint } from "./Checkpoint";

@Entity()
class Verification {
  @PrimaryGeneratedColumn("uuid")
  verification_id: string;

  @Column("text")
  name: string;

  @ManyToOne(() => Artifact, { nullable: true })
  @JoinColumn({ name: "artifact_id", referencedColumnName: "artifact_id" })
  artifact_id: Artifact;

  @OneToMany(() => Checkpoint, (checkpoint) => checkpoint.verification_id)
  checkpoints: Checkpoint[];

  constructor() {
    if (!this.verification_id) {
      this.verification_id = uuidV4();
    }
  }
}

export { Verification };
