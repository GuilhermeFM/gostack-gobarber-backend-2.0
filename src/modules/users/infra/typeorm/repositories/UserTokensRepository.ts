import IUserTokensRepository from '@modules/users/repositories/IUserTokenRepository';
import UserTokens from '@modules/users/infra/typeorm/entities/UserTokens';

export default class UserTokensRepository implements IUserTokensRepository {
  public async generate(user_id: string): Promise<UserTokens> {}
}
