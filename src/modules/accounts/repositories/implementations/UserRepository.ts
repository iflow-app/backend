import { getRepository, Repository } from "typeorm";

import { ICreateUserDTO } from "../../dtos/ICreateUserDTO";
import { Project } from "../../entities/Project";
import { User } from "../../entities/User";
import { IUserRepository } from "../IUserRepository";

class UserRepository implements IUserRepository {
  private repository: Repository<User>;

  constructor() {
    this.repository = getRepository(User);
  }

  async create({ name, email, password }: ICreateUserDTO): Promise<void> {
    const user = this.repository.create({
      name,
      email,
      password,
    });

    await this.repository.save(user);
  }

  async findByEmail(email: string): Promise<User> {
    const user = await this.repository.findOne({ email });

    return user;
  }

  async findById(id: string): Promise<User> {
    const user = await this.repository.findOne(id);

    return user;
  }

  async findProjects(user_id: string): Promise<Project[]> {
    const user = await this.repository.findOne({
      relations: ["projects"],
      where: { user_id },
    });

    console.log(user);

    return user.projects;
  }
}
export { UserRepository };