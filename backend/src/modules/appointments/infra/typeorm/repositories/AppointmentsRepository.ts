import { getRepository, Repository } from 'typeorm';

import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository';


import Appoitment from '@modules/appointments/infra/typeorm/entities/Appointment';
import ICreateAppointmentDTO from '@modules/appointments/dtos/ICreateAppointmentDTO';
import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment';


class AppointmentsRepository implements IAppointmentsRepository {
  private ormRepository: Repository<Appoitment>;

  constructor() {
    this.ormRepository = getRepository(Appoitment);
  }
  public async findByDate(date: Date): Promise<Appoitment | undefined> {
    const findAppointment = await this.ormRepository.findOne({
      where: { date },
    });

    return findAppointment;
  }

  public async create({ provider_id, date }: ICreateAppointmentDTO): Promise<Appointment> {
    const appointment = this.ormRepository.create({ provider_id, date});

    await this.ormRepository.save(appointment);

    return appointment;
  }
}

export default AppointmentsRepository;