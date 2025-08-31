import { HttpException, Injectable } from '@nestjs/common';
import { PersonRepository } from '../../domain/repositories/person.repository';
import { UpdatePersonDto } from '../dtos/update-person.dto';
import { Person } from '../../domain/entities/person.entity';

@Injectable()
export class UpdatePersonUseCase {
  constructor(private person: PersonRepository) {}

  async updatePerson(id: number, data: UpdatePersonDto): Promise<Person> {
    try {
      const existPerson = await this.person.findById(id.toString());
      if (!existPerson) {
        throw new HttpException({ Error: 'No se encontró la persona' }, 404);
      }
      const updatedPerson = new Person(
        existPerson.id,
        existPerson.userId,
        data.curriculum ?? existPerson.curriculum,
        data.disabilityType ?? existPerson.disabilityType,
        data.location ?? existPerson.location,
        data.jobProfile ?? existPerson.jobProfile,
        existPerson.createdAt,
        new Date(),
        existPerson.deletedAt,
      );
      return this.person.update(id.toString(), updatedPerson);
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(
        {
          Error: `Error al actualizar la persona: ${(error as Error).message}`,
        },
        500,
      );
    }
  }
}
