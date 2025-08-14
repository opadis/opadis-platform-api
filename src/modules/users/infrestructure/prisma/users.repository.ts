import { Injectable } from '@nestjs/common';
import { UsersRepository } from '../../domain/repositories/users.repository';
import { User } from '../../domain/entities/users.entity';
import { UserStatusMapper } from '../mappers/user-status.mapper';
import { PrismaService } from '../../../../connect/prisma.service';
@Injectable()
export class PrismaUsersRepository implements UsersRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(user: User): Promise<User> {
    const created = await this.prisma.user.create({
      data: {
        name: user.name,
        email: user.email,
        password: user.password,
        roleId: user.role?.id ?? user.roleId,
        status: UserStatusMapper.toPrisma(user.status),
      },
      include: {
        role: true,
      },
    });

    return new User(
      created.id,
      created.name,
      created.email,
      created.password,
      created.roleId,
      UserStatusMapper.toDomain(created.status),
      created.role,
      created.createdAt,
      created.updatedAt,
      created.deletedAt,
    );
  }

  async findall(): Promise<User[]> {
    const users = await this.prisma.user.findMany({
      include: {
        role: true,
      },
    });

    return users.map(
      (u) =>
        new User(
          u.id,
          u.name,
          u.email,
          u.password,
          u.roleId,
          UserStatusMapper.toDomain(u.status),
          u.role,
          u.createdAt,
          u.updatedAt,
          u.deletedAt,
        ),
    );
  }

  async findById(id: number): Promise<User | null> {
    const user = await this.prisma.user.findUnique({
      where: { id },
      include: {
        role: true,
      },
    });

    if (!user) return null;

    return new User(
      user.id,
      user.name,
      user.email,
      user.password,
      user.roleId,
      UserStatusMapper.toDomain(user.status),
      user.role,
      user.createdAt,
      user.updatedAt,
      user.deletedAt,
    );
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = await this.prisma.user.findUnique({
      where: { email },
      include: {
        role: true,
      },
    });

    if (!user) return null;

    return new User(
      user.id,
      user.name,
      user.email,
      user.password,
      user.roleId,
      UserStatusMapper.toDomain(user.status),
      user.role,
      user.createdAt,
      user.updatedAt,
      user.deletedAt,
    );
  }

  async update(id: number, user: User): Promise<User> {
    const updated = await this.prisma.user.update({
      where: { id },
      data: {
        name: user.name,
        email: user.email,
        password: user.password,
        roleId: user.role?.id ?? user.roleId,
        status: UserStatusMapper.toPrisma(user.status),
        deletedAt: user.deletedAt, // <--- Aquí agregas esta línea
      },
      include: {
        role: true,
      },
    });

    return new User(
      updated.id,
      updated.name,
      updated.email,
      updated.password,
      updated.roleId,
      UserStatusMapper.toDomain(updated.status),
      updated.role,
      updated.createdAt,
      updated.updatedAt,
      updated.deletedAt,
    );
  }

  async delete(id: number): Promise<User> {
    const updated = await this.prisma.user.update({
      where: { id },
      data: {
        status: 'SUSPENDIDO',
      },
      include: {
        role: true,
      },
    });

    return new User(
      updated.id,
      updated.name,
      updated.email,
      updated.password,
      updated.roleId,
      UserStatusMapper.toDomain(updated.status),
      updated.role,
      updated.createdAt,
      updated.updatedAt,
      updated.deletedAt,
    );
  }
}
