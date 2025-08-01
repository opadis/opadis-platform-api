import { HttpException, Injectable } from '@nestjs/common';
import { RoleRepository } from "../../domain/repository/users.repository";
import { Role } from "../../domain/enteties/role.entity";
import { UpdateRoleDto } from "../dtos/update-role.dto";

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
        } catch (error) {
            // Puedes loggear error si quieres más trazabilidad
            throw new HttpException(error.message || 'Error updating role', 500);
        }
    }
}
