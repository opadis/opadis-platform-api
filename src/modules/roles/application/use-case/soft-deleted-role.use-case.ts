import { HttpException, Injectable } from '@nestjs/common';
import { RoleRepository } from '../../domain/repository/role.repository';
import { Role } from '../../domain/enteties/role.entity';

@Injectable()
export class SoftDeletedRoleUseCase {
  constructor(private readonly roleRepository: RoleRepository) {}

  async softDeleteRole(id: number): Promise<Role> {
    try {
      const role = await this.roleRepository.findById(id);
      if (!role) {
        throw new HttpException('Role not found', 404);
      }

      // Actualizar isDeleted y deletedAt en base de datos
      const updatedRole = await this.roleRepository.update(id, {
        isDeleted: true,
        deletedAt: new Date(),
      });

      return updatedRole; // Devuelve el rol actualizado con isDeleted y deletedAt
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new HttpException(error.message, 500);
      }
      throw new HttpException('Error soft deleting role', 500);
    }
  }
}
