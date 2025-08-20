import { HttpException, Injectable } from '@nestjs/common';
import { RoleRepository } from '../../domain/repository/role.repository';
import { Role } from '../../domain/enteties/role.entity';
import { UpdateRoleDto } from '../dtos/update-role.dto';

@Injectable()
export class UpdateRoleUseCase {
  constructor(private readonly roleRepository: RoleRepository) {}

  async updateRole(id: number, updateRoleDto: UpdateRoleDto): Promise<Role> {
    const existingRole = await this.roleRepository.findById(id);
    if (!existingRole) {
      throw new HttpException('Role not found', 404);
    }

    const updatedRoleData: Partial<Role> = {};
    if (updateRoleDto.name) {
      updatedRoleData.name = updateRoleDto.name;
    }

    // Validar si hay cambios reales
    if (Object.keys(updatedRoleData).length === 0) {
      throw new HttpException('No fields to update', 400);
    }

    try {
      return await this.roleRepository.update(id, updatedRoleData);
    } catch (error: unknown) {
      // Puedes loggear error si quieres más trazabilidad
      if (error instanceof Error) {
        throw new HttpException(error.message, 500);
      }
      throw new HttpException('Internal server error', 500);
    }
  }
}
