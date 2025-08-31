import { Person } from '../entities/person.entity';

export abstract class PersonRepository {
  abstract create(person: Person): Promise<Person>;
  abstract findAll(): Promise<Person[]>;
  abstract findById(id: string): Promise<Person | null>;
  abstract update(id: string, person: Person): Promise<Person>;
  abstract delete(id: string): Promise<Person>;
  abstract findByEmail(email: string): Promise<Person | null>;
}
