import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '../../repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '../../providers/fakes/FaketHashProvider';
import AuthenticateUserService from '../AuthenticateUserService';
import CreateUserService from '../CreateUserService';

let fakeHashProvider: FakeHashProvider;
let fakeUsersRepository: FakeUsersRepository;
let createUserService: CreateUserService;
let authenticateUserService: AuthenticateUserService;

describe('AuthenticateUser', () => {
  beforeEach(() => {
    fakeHashProvider = new FakeHashProvider();
    fakeUsersRepository = new FakeUsersRepository();
    createUserService = new CreateUserService(fakeUsersRepository, fakeHashProvider);
    authenticateUserService = new AuthenticateUserService(fakeUsersRepository, fakeHashProvider);
  });

  it('should be able to authenticate', async () => {
    const user = await createUserService.execute({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    });

    const response = await authenticateUserService.execute({
      email: 'johndoe@example.com',
      password: '123456',
    });

    expect(response).toHaveProperty('token');
    expect(response.user).toEqual(user);
  });

  it('should not be able to authenticate with non existing user', async () => {
    expect(
      authenticateUserService.execute({
        email: 'johndoe@example.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to authenticate with wrong password', async () => {
    await createUserService.execute({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    });

    expect(
      authenticateUserService.execute({
        email: 'johndoe@example.com',
        password: '123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
