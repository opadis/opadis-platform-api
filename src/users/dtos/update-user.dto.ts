import { IsString, IsInt, IsOptional, IsEmail, IsEnum } from 'class-validator';
import { status } from '@prisma/client';

export class UpdateUserDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsString()
  password?: string;

  @IsOptional()
  @IsInt()
  roleId?: number;

  @IsOptional()
  @IsEnum(status)
  status?: status;

  @IsOptional()
  deletedAt?: Date;
}
