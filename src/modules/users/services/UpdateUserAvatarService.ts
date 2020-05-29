import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IStorageProvider from '@shared/providers/StorageProvider/models/IStorageProvider';
import User from '@modules/users/infra/typeorm/entities/Users';
import IUsersRepository from '../repositories/IUserRepository';
import IUpdateUserAvatarDTO from '../dtos/IUpdateUserAvatarDTO';

@injectable()
export default class UpdateUserAvatarService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
    @inject('StorageProvider')
    private storageProvider: IStorageProvider,
  ) {}

  public async execute({ user_id, filename }: IUpdateUserAvatarDTO): Promise<User> {
    const user = await this.usersRepository.findById(user_id);

    if (!user) {
      throw new AppError('Only authenticated users can change avatar.', 400);
    }

    if (user.avatar) {
      this.storageProvider.deleteFile(user.avatar);
    }

    user.avatar = await this.storageProvider.saveFile(filename);

    await this.usersRepository.save(user);

    return user;
  }
}
