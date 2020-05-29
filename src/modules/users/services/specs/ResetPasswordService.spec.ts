import FakeHashProvider from '@modules/users/providers/fakes/FaketHashProvider';
import FakeUsersRepository from '../../repositories/fakes/FakeUsersRepository';
import ResetPasswordService from '../ResetPasswordService';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let resetPassword: ResetPasswordService;

describe('ResetPassword', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();
    resetPassword = new ResetPasswordService(fakeUsersRepository, fakeHashProvider);
  });

  it('should be able to reset password', async () => {
    resetPassword.execute();
  });
});
