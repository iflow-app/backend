import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";

import { User } from "./User";

@Entity()
class UserToken {
  @PrimaryGeneratedColumn("uuid")
  user_token_id: string;

  @Column()
  refresh_token: string;

  @Column()
  user_id: string;

  @Column()
  expires_date: Date;

  @CreateDateColumn()
  created_at: Date;

  @ManyToOne(() => User, { nullable: false, cascade: ["update", "remove"] })
  @JoinColumn({ name: "user_id" })
  user: User;
}

export { UserToken };
