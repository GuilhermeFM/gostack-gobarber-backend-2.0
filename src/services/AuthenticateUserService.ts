import { getRepository } from 'typeorm';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';

import config from '../config/auth';

import AppError from '../errors/AppError';
import User from '../models/Users';

interface ExecuteParams {
  email: string;
  password: string;
}

interface ExecuteReturn {
  user: User;
  token: string;
}

class AuthenticateUserService {
  public async execute({
    email,
    password,
  }: ExecuteParams): Promise<ExecuteReturn> {
    const usersRepository = getRepository(User);

    const user = await usersRepository.findOne({ where: { email } });

    if (!user) {
      throw new AppError('Incorrect email or password', 400);
    }

    const passwordMatched = await compare(password, user.password);

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

export default AuthenticateUserService;
