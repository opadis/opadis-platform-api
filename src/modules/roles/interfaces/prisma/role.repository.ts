import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/connect/prisma.service';
import { RoleRepository } from '../../domain/repository/role.repository';
import { Role } from '../../domain/enteties/role.entity';

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
      data: {
        name: role.name,
        isDeleted: role.isDeleted,
        deletedAt: role.deletedAt || null, // Aseguramos que deletedAt sea null si no se proporciona
      },
    });
  }

  async delete(id: number): Promise<void> {
    await this.prisma.role.update({
      where: { id },
      data: {
        isDeleted: true,
        deletedAt: new Date(), // Asignamos la fecha actual a deletedAt
      },
    });
  }

  async findAll(): Promise<Role[]> {
    return this.prisma.role.findMany({});
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
