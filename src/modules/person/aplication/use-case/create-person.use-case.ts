import { HttpException, Injectable } from '@nestjs/common';
import { PersonRepository } from '../../domain/repositories/person.repository';
import { UsersRepository } from 'src/modules/users/domain/repositories/users.repository';
import { CreatePersonDto } from '../dtos/create-person.dto';
import { Person } from '../../domain/entities/person.entity';

@Injectable()
export class CreatePersonUseCase {
  constructor(
    private readonly personRepository: PersonRepository,
    private readonly usersRepository: UsersRepository,
  ) {}

  async createPerson(data: CreatePersonDto): Promise<Person> {
    try {
      // Validar que el usuario exista
      const user = await this.usersRepository.findById(data.userId);
      if (!user) {
        throw new HttpException(
          { Error: `No existe un usuario con id ${data.userId}` },
          400,
        );
      }
      const newPerson = new Person(
        0, // El ID será asignado por la base de datos
        data.userId,
        data.curriculum,
        data.disabilityType,
        data.location,
        data.jobProfile,
      );
      // Guardar en la base de datos
      return await this.personRepository.create(newPerson);
    } catch (error) {
      if (error instanceof HttpException) throw error;
      throw new HttpException(
        {
          Error: `Error al crear la persona: ${(error as Error).message}`,
        },
        500,
      );
    }
  }
}

