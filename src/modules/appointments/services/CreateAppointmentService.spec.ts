import AppError from '@shared/errors/AppError';
import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';
import CreateAppointmentService from './CreateAppointmentService';

describe('CreateAppointment', () => {
  it('should be able to create a new appointments', async () => {
    const fakeAppointmentRepository = new FakeAppointmentsRepository();
    const createAppointmentService = new CreateAppointmentService(fakeAppointmentRepository);
    const appointments = await createAppointmentService.execute({
      date: new Date(),
      provider_id: '123456',
    });

    expect(appointments).toHaveProperty('id');
    expect(appointments.provider_id).toBe('123456');
  });

  it('should not be able to create two appointments on the same date', async () => {
    const fakeAppointmentRepository = new FakeAppointmentsRepository();
    const createAppointmentService = new CreateAppointmentService(fakeAppointmentRepository);

    const appointmentDate = new Date();
    await createAppointmentService.execute({
      date: appointmentDate,
      provider_id: '123456',
    });

    expect(
      createAppointmentService.execute({
        date: appointmentDate,
        provider_id: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
