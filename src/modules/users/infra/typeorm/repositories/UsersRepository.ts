import { getRepository, Repository } from 'typeorm';
import IUsersRepository from '@modules/users/repositories/IUserRepository';
import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO';

import Users from '../entities/Users';

export default class UsersRepository implements IUsersRepository {
  public ormRepository: Repository<Users>;

  constructor() {
    this.ormRepository = getRepository(Users);
  }

  public async findByEmail(email: string): Promise<Users | undefined> {
    const user = await this.ormRepository.findOne({ where: { email } });
    return user;
  }

  public async findById(id: string): Promise<Users | undefined> {
    const user = await this.ormRepository.findOne(id);
    return user;
  }

  public async create({ email, name, password }: ICreateUserDTO): Promise<Users> {
    const user = this.ormRepository.create({ name, email, password });
    await this.ormRepository.save(user);
    return user;
  }

  public async save(user: Users): Promise<Users> {
    await this.ormRepository.save(user);
    return user;
  }
}
