import { uuid } from 'uuidv4';

import IUsersRepository from '@modules/users/repositories/IUserRepository';
import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO';
import Users from '@modules/users/infra/typeorm/entities/Users';

export default class FakeUsersRepository implements IUsersRepository {
  public users: Users[] = [];

  public async findByEmail(email: string): Promise<Users | undefined> {
    return this.users.find(user => user.email === email);
  }

  public async findById(id: string): Promise<Users | undefined> {
    return this.users.find(user => user.id === id);
  }

  public async create({ email, name, password }: ICreateUserDTO): Promise<Users> {
    const user = new Users();

    Object.assign(user, { id: uuid(), email, name, password });

    this.users.push(user);

    return user;
  }

  public async save(user: Users): Promise<Users> {
    const userArrayIndex = this.users.findIndex(arrayUser => arrayUser.id === user.id);

    this.users[userArrayIndex] = user;

    return user;
  }
}
