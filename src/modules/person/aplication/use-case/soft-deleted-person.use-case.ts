import { HttpException, Injectable } from '@nestjs/common';
import { PersonRepository } from '../../domain/repositories/person.repository';
import { Person } from '../../domain/entities/person.entity';

@Injectable()
export class SoftDeletedPersonUseCase {
  constructor(private personRepository: PersonRepository) {}
  async softDeletedPerson(id: number): Promise<Person> {
    try {
      const person = await this.personRepository.delete(id.toString());
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
          Error: `Error al eliminar la persona: ${(error as Error).message}`,
        },
        500,
      );
    }
  }
  1;
}
