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

  @Column()
  artifact_id: string;

  @ManyToOne(() => Artifact, { nullable: false })
  @JoinColumn({ name: "artifact_id", referencedColumnName: "artifact_id" })
  artifact: Artifact;

  @OneToMany(() => Checkpoint, (checkpoint) => checkpoint.verification)
  checkpoints: Checkpoint[];

  constructor() {
    if (!this.verification_id) {
      this.verification_id = uuidV4();
    }
  }
}

export { Verification };
