import AppError from '@shared/errors/AppError';
import FakeStorageProvider from '@shared/providers/StorageProvider/fakes/FakeStorageProvider';
import FakeUsersRepository from '../../repositories/fakes/FakeUsersRepository';
import UpdateUserAvatarService from '../UpdateUserAvatarService';

let fakeUserRepository: FakeUsersRepository;
let fakeStorageProvider: FakeStorageProvider;
let updateUserAvatar: UpdateUserAvatarService;

describe('UpdateUserAvatar', () => {
  beforeEach(() => {
    fakeUserRepository = new FakeUsersRepository();
    fakeStorageProvider = new FakeStorageProvider();
    updateUserAvatar = new UpdateUserAvatarService(fakeUserRepository, fakeStorageProvider);
  });
  it('Should be able to update avatar', async () => {
    const user = await fakeUserRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    });

    await updateUserAvatar.execute({
      user_id: user.id,
      filename: 'avatar.jpg',
    });

    expect(user.avatar).toBe('avatar.jpg');
  });

  it('Should not be able to update avatar of non existing user', async () => {
    expect(
      updateUserAvatar.execute({
        user_id: 'non-existing-user',
        filename: 'avatar.jpg',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('Should delete old avatar when update new one', async () => {
    const deleteFileSpy = jest.spyOn(fakeStorageProvider, 'deleteFile');

    const user = await fakeUserRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    });

    await updateUserAvatar.execute({
      user_id: user.id,
      filename: 'avatar.jpg',
    });

    await updateUserAvatar.execute({
      user_id: user.id,
      filename: 'avatar_2.jpg',
    });

    expect(deleteFileSpy).toHaveBeenCalledWith('avatar.jpg');
    expect(user.avatar).toBe('avatar_2.jpg');
  });
});
