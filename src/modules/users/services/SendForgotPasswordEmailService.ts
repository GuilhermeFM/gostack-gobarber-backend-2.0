import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IMailProvider from '@shared/providers/MailProvider/models/IMailProvider';
import IUsersRepository from '../repositories/IUserRepository';
import IUserTokensRepository from '../repositories/IUserTokenRepository';

interface ISendForgotPasswordEmailParams {
  to: string;
}

@injectable()
export default class SendForgotPasswordEmailService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
    @inject('UserTokensRepository')
    private userTokensRepository: IUserTokensRepository,
    @inject('MailProvider')
    private mailProvider: IMailProvider,
  ) {}

  public async execute({ to }: ISendForgotPasswordEmailParams): Promise<void> {
    const user = await this.usersRepository.findByEmail(to);

    if (!user) {
      throw new AppError('User does not exists.', 400);
    }

    await this.userTokensRepository.generate(user.id);
    await this.mailProvider.sendMail(to, '');
  }
}
