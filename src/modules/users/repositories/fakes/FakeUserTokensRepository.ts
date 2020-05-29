import { uuid } from 'uuidv4';

import IUserTokenRepository from '@modules/users/repositories/IUserTokenRepository';
import UserTokens from '@modules/users/infra/typeorm/entities/UserTokens';

export default class FakeUserTokensRepository implements IUserTokenRepository {
  public userTokens: UserTokens[] = [];

  public async generate(user_id: string): Promise<UserTokens> {
    const userToken = new UserTokens();

    Object.assign(userToken, {
      id: uuid(),
      token: uuid(),
      user_id,
    });

    this.userTokens.push(userToken);

    return userToken;
  }
}
