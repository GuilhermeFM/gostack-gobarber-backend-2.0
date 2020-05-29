import AppError from '@shared/errors/AppError';
import FakeMailProvider from '@shared/providers/MailProvider/fakes/FakeMailProvider';
import FakeUserTokensRepository from '@modules/users/repositories/fakes/FakeUserTokensRepository';
import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import SendForgotPasswordService from '../SendForgotPasswordEmailService';

let fakeMailProvider: FakeMailProvider;
let fakeUserRepository: FakeUsersRepository;
let fakeUserTokensRepository: FakeUserTokensRepository;
let sendForgotPasswordEmail: SendForgotPasswordService;

describe('SendForgotPassword', () => {
  beforeEach(() => {
    fakeMailProvider = new FakeMailProvider();
    fakeUserRepository = new FakeUsersRepository();
    fakeUserTokensRepository = new FakeUserTokensRepository();
    sendForgotPasswordEmail = new SendForgotPasswordService(
      fakeUserRepository,
      fakeUserTokensRepository,
      fakeMailProvider,
    );
  });

  it('should be able to send recovery password email', async () => {
    const sendMailSpy = jest.spyOn(fakeMailProvider, 'sendMail');

    await fakeUserRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    });

    await sendForgotPasswordEmail.execute({
      to: 'johndoe@example.com',
    });

    expect(sendMailSpy).toBeCalled();
  });

  it('should not be able to send recovery password email to a non-existing user', async () => {
    await expect(
      sendForgotPasswordEmail.execute({
        to: 'johndoe@example.com',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should generate a forgot password token', async () => {
    const sendMailSpy = jest.spyOn(fakeMailProvider, 'sendMail');
    const generateSpy = jest.spyOn(fakeUserTokensRepository, 'generate');

    const user = await fakeUserRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    });

    await sendForgotPasswordEmail.execute({
      to: 'johndoe@example.com',
    });

    expect(sendMailSpy).toBeCalled();
    expect(generateSpy).toBeCalledWith(user.id);
  });
});
