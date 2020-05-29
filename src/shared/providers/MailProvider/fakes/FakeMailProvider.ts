import IMailProvider from '../models/IMailProvider';

export default class FakeMailProvider implements IMailProvider {
  private messages: { to: string; body: string }[] = [];

  public async sendMail(to: string, body: string): Promise<void> {
    this.messages.push({ to, body });
  }
}
