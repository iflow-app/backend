import { getRepository, Repository } from "typeorm";

import { ICreateUserTokenDTO } from "../../dtos/ICreateUserTokenDTO";
import { UserToken } from "../../entities/UserToken";
import { IUserTokenRepository } from "../IUserTokenRepository";

class UserTokenRepository implements IUserTokenRepository {
  private repository: Repository<UserToken>;

  constructor() {
    this.repository = getRepository(UserToken);
  }

  async create({
    expires_date,
    refresh_token,
    user_id,
  }: ICreateUserTokenDTO): Promise<UserToken> {
    const userToken = this.repository.create({
      expires_date,
      refresh_token,
      user_id,
    });

    const userTokenRow = await this.repository.save(userToken);

    return userTokenRow;
  }

  async findByUserIdAndRefreshToken(
    user_id: string,
    refresh_token: string
  ): Promise<UserToken> {
    const userTokens = await this.repository.findOne({
      user_id,
      refresh_token,
    });

    return userTokens;
  }

  async deleteById(user_token_id: string): Promise<void> {
    await this.repository.delete(user_token_id);
  }
}

export { UserTokenRepository };
