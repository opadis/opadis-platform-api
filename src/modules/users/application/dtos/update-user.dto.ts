import { IsOptional, IsEnum } from 'class-validator';
import { UserStatus } from '../../domain/enums/user-status.enum';

export class UpdateUserDto {
  @IsOptional()
  name?: string;

  @IsOptional()
  email?: string;

  @IsOptional()
  password?: string;

  @IsOptional()
  roleId?: number;

  @IsOptional()
  @IsEnum(UserStatus, { message: 'El estado debe ser ACTIVO o SUSPENDIDO' })
  status?: UserStatus; // <-- Enum del dominio, no de Prisma
}

