import { User } from 'src/modules/users/domain/entities/users.entity';

export class Person {
  constructor(
    public id: number,
    public userId: number, // 🔹 Aquí que sea number
    public curriculum: string,
    public disabilityType: string,
    public location: string,
    public jobProfile: string,
    public createdAt?: Date,
    public updatedAt?: Date,
    public deletedAt?: Date | null,
    public user?: User, // 🔹 Opcional: relación con User si la quieres cargar
  ) {}
}
