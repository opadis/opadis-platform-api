import { HttpException, Injectable } from '@nestjs/common';
import { RoleRepository } from '../../domain/repository/users.repository';
import { Role } from '../../domain/enteties/role.entity';

@Injectable()
export class SoftDeletedRoleUseCase {
  constructor(private readonly roleRepository: RoleRepository) {}

  async softDeleteRole(id: number): Promise<void> {
    try {
      const role = await this.roleRepository.findById(id);
      if (!role) {
        throw new HttpException('Role not found', 404);
      }

      role.isDeleted = true;

      await this.roleRepository.update(id, { isDeleted: true });
    } catch (error) {
      throw new HttpException(error.message || 'Error soft deleting role', 500);
    }
  }
}
