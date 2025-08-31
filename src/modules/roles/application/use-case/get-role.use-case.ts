import { HttpException, Injectable } from '@nestjs/common';
import { RoleRepository } from '../../domain/repository/role.repository';
import { Role } from '../../domain/enteties/role.entity';

@Injectable()
export class GetRoleUseCase {
  constructor(private roleRepository: RoleRepository) {}

  async getAllRoles(): Promise<Role[]> {
    try {
      return await this.roleRepository.findAll();
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new HttpException(error.message, 500);
      }
      throw new HttpException('Internal server error', 500);
    }
  }

  async getRoleById(id: number): Promise<Role | null> {
    try {
      const role = await this.roleRepository.findById(id);
      if (!role) {
        throw new HttpException('Role not found', 404);
      }
      return role;
    } catch (error: unknown) {
      if (error instanceof HttpException) {
        throw error; // Re-throw HttpExceptions to preserve status codes
      }
      if (error instanceof Error) {
        throw new HttpException(error.message, 500);
      }
      throw new HttpException('Internal server error', 500);
    }
  }

  async getRoleByName(name: string): Promise<Role | null> {
    try {
      const roles = await this.roleRepository.findAll();
      return roles.find((role) => role.name === name) || null;
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new HttpException(error.message, 500);
      }
      throw new HttpException('Internal server error', 500);
    }
  }
}
