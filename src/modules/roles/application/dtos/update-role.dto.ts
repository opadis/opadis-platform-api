import { IsOptional, IsString, MinLength } from 'class-validator';

export class UpdateRoleDto {
  @IsOptional()
  @IsString()
  @MinLength(3, {
    message: 'El nombre del rol debe tener al menos 3 caracteres',
  })
  name?: string;
}
