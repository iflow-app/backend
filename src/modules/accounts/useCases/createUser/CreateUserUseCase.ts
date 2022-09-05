import { hash } from "bcrypt";
import { inject, injectable } from "tsyringe";

import { ICreateUserDTO } from "../../dtos/ICreateUserDTO";
import { IUserRepository } from "../../repositories/IUserRepository";

@injectable()
class CreateUserUseCase {
  constructor(
    @inject("UserRepository")
    private userRepository: IUserRepository
  ) {}

  async execute({ name, email, password }: ICreateUserDTO) {
    const userAlreadyExists = await this.userRepository.findByEmail(email);

    if (userAlreadyExists) {
      throw new Error("User already exists!");
    }

    const passwordHash = await hash(password, 8);

    await this.userRepository.create({
      name,
      email,
      password: passwordHash,
    });
  }
}

export { CreateUserUseCase };
