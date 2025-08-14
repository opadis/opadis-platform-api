import { IsString, MinLength } from 'class-validator';

export class CreateRoleDto {
  @IsString()
  @MinLength(3, {
    message: 'El nombre del rol debe tener al menos 3 caracteres',
  })
  name: string;
}
