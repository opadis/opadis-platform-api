import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/Connect/prisma.service";
import { RoleRepository } from "../../domain/repository/users.repository";
import { Role } from "../../domain/enteties/role.entity";

@Injectable()
export class PrismaRoleRepository implements RoleRepository {
    constructor(private readonly prisma: PrismaService) {}

    async create(role: Role): Promise<Role> {
        return this.prisma.role.create({
            data: {
                name: role.name,
                isDeleted: role.isDeleted || false,
            },
        });
    }

    async findById(id: number): Promise<Role | null> {
        return this.prisma.role.findFirst({
            where: {
                id,
                isDeleted: false,
            },
        });
    }

    async update(id: number, role: Partial<Role>): Promise<Role> {
        return this.prisma.role.update({
            where: { id },
            data: role,
        });
    }

    async delete(id: number): Promise<void> {
        await this.prisma.role.update({
            where: { id },
            data: {
                isDeleted: true,
            },
        });
    }

    async findAll(): Promise<Role[]> {
        return this.prisma.role.findMany({
            where: {
                isDeleted: false,
            },
        });
    }

    async findByName(name: string): Promise<Role | null> {
        return this.prisma.role.findFirst({
            where: {
                name,
                isDeleted: false,
            },
        });
    }
}
