import { UserStatus } from '../enums/user-status.enum';
import { Role } from 'src/modules/roles//domain/enteties/role.entity';

export class User {
  constructor(
    public id: number,
    public name: string,
    public email: string,
    public password: string,
    public roleId: number,
    public status: UserStatus,
    public role?: Role, // Opcional para incluir el objeto rol cuando traes datos
    public createdAt?: Date,
    public updatedAt?: Date,
    public deletedAt?: Date | null,
  ) {}
}
