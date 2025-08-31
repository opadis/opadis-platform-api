import { Injectable, HttpException } from '@nestjs/common';
import { PersonRepository } from '../../domain/repositories/person.repository';
import { Person } from '../../domain/entities/person.entity';

@Injectable()
export class getPersonUseCase {
  constructor(private personRepository: PersonRepository) {}

  async getAllPerson(): Promise<Person[]> {
    try {
      const persons = await this.personRepository.findAll();
      if (!persons.length) {
        throw new HttpException(
          {
            Error: 'No se encontraron personas',
          },
          404,
        );
      }
      return persons;
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(
        {
          Error: `Error al obtener las personas: ${(error as Error).message}`,
        },
        500,
      );
    }
  }
  async getByIdPerson(id: number): Promise<Person> {
    try {
      const person = await this.personRepository.findById(id.toString());
      if (!person) {
        throw new HttpException({ Error: 'No se encontró la persona' }, 404);
      }
      return person;
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(
        {
          Error: `Error al obtener la persona: ${(error as Error).message}`,
        },
        500,
      );
    }
  }
}
