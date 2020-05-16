import { sign } from 'jsonwebtoken';
import { injectable, inject } from 'tsyringe';

import config from '@config/auth';
import AppError from '@shared/errors/AppError';

import User from '@modules/users/infra/typeorm/entities/Users';
import IUsersRepository from '../repositories/IUserRepository';
import IAuthenticateUserDTO from '../dtos/IAuthenticateUserDTO';
import IHashProvider from '../providers/model/IHashProvider';

interface ExecuteReturn {
  user: User;
  token: string;
}

@injectable()
export default class AuthenticateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  public async execute({ email, password }: IAuthenticateUserDTO): Promise<ExecuteReturn> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new AppError('Incorrect email or password', 400);
    }

    const passwordMatched = await this.hashProvider.compareHash(password, user.password);

    if (!passwordMatched) {
      throw new AppError('Incorrect email or password', 400);
    }

    const token = sign({}, config.jwt.secret, {
      subject: user.id,
      expiresIn: config.jwt.expires_in,
    });

    return { user, token };
  }
}
