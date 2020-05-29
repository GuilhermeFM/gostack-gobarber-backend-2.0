import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import User from '@modules/users/infra/typeorm/entities/Users';
import IUsersRepository from '../repositories/IUserRepository';
import IHashProvider from '../providers/model/IHashProvider';

interface IResetPasswordParam {
  token: string;
  password: string;
}

@injectable()
export default class ResetPasswordService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  public async execute(): Promise<User> {
    return new User();
  }
}
