import { IsString, IsInt, IsOptional, IsEmail, IsEnum } from 'class-validator';
import { status } from '@prisma/client';

export class CreateUserDto {
  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  password: string;

  @IsInt()
  roleId: number;

  @IsEnum(status)
  status: status;

  @IsOptional()
  deletedAt?: Date;
}
