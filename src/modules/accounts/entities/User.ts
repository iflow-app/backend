import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { v4 as uuidV4 } from "uuid";

import { Project } from "./Project";

@Entity()
class User {
  @PrimaryGeneratedColumn("uuid")
  user_id: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  name: string;

  @OneToMany(() => Project, (project) => project.user_id)
  projects: Project[];

  constructor() {
    if (!this.user_id) {
      this.user_id = uuidV4();
    }
  }
}

export { User };
