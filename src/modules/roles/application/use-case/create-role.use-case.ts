import { HttpException, Injectable } from '@nestjs/common';
import { Role } from '../../domain/enteties/role.entity';
import { RoleRepository } from '../../domain/repository/role.repository';
import { CreateRoleDto } from '../dtos/create-role.dto';

@Injectable()
export class CreateRoleUseCase {
  constructor(private readonly roleRepository: RoleRepository) {}

  async createRole(createRoleDto: CreateRoleDto): Promise<Role> {
    const existing = await this.roleRepository.findByName(createRoleDto.name);
    if (existing) {
      throw new HttpException('Role already exists', 409);
    }

    const role = new Role();
    role.name = createRoleDto.name;

    try {
      return await this.roleRepository.create(role);
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new HttpException(error.message, 500);
      }
      throw new HttpException('Internal server error', 500);
    }
  }
}
