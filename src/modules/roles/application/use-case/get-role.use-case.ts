import { HttpException, Injectable } from "@nestjs/common";
import { RoleRepository } from "../../domain/repository/users.repository";
import { Role } from "../../domain/enteties/role.entity";

@Injectable()
export class GetRoleUseCase {
    constructor(private roleRepository: RoleRepository) {}
    
    async getAllRoles(): Promise<Role[]> {
        try {
            return await this.roleRepository.findAll();
        } catch (error) {
            throw new HttpException(error.message || 'Error fetching roles', 500);
        }
    }

    async getRoleById(id: number): Promise<Role | null> {
        try {
            const role = await this.roleRepository.findById(id);
            if (!role) {
                throw new HttpException('Role not found', 404);
            }
            return role;
        } catch (error) {
            throw new HttpException(error.message || 'Error fetching role', 500);
        }
    }

    async getRoleByName(name: string): Promise<Role | null> {
        try {
            const roles = await this.roleRepository.findAll();
            return roles.find(role => role.name === name) || null;
        } catch (error) {
            throw new HttpException(error.message || 'Error fetching role by name', 500);
        }
    }
}