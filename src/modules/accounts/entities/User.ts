import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  Unique,
} from "typeorm";
import { v4 as uuidV4 } from "uuid";

import { Project } from "./Project";

@Entity()
@Unique(["email"])
class User {
  @PrimaryGeneratedColumn("uuid")
  user_id: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  name: string;

  @OneToMany(() => Project, (project) => project.user)
  projects: Project[];

  constructor() {
    if (!this.user_id) {
      this.user_id = uuidV4();
    }
  }
}

export { User };
