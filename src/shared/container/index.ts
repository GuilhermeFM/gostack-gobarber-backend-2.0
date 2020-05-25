import { container } from 'tsyringe';

import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository';
import AppointmentsRepository from '@modules/appointments/infra/typeorm/repositories/AppointmentsRepository';
import IUsersRepository from '@modules/users/repositories/IUserRepository';
import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';
import IHashProvider from '@modules/users/providers/model/IHashProvider';
import BCryptHashProvider from '@modules/users/providers/implementations/BCryptHashProvider';
import IStorageProvider from '@shared/providers/models/IStorageProvider';
import DiskStorageProvider from '@shared/providers/implementations/DiskStorageProvide';

container.registerSingleton<IAppointmentsRepository>('AppointmentsRepository', AppointmentsRepository);
container.registerSingleton<IUsersRepository>('UsersRepository', UsersRepository);
container.registerSingleton<IHashProvider>('HashProvider', BCryptHashProvider);
container.registerSingleton<IStorageProvider>('StorageProvider', DiskStorageProvider);
