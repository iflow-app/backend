import { ICreateUserDTO } from "../dtos/ICreateUserDTO";
import { Project } from "../entities/Project";
import { User } from "../entities/User";

interface IUserRepository {
  create(data: ICreateUserDTO): Promise<User>;
  findByEmail(email: string): Promise<User>;
  findById(id: string): Promise<User>;
  findProjects(user_id: string): Promise<Project[]>;
}

export { IUserRepository };
