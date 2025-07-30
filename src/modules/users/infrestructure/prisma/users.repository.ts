import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/Connect/prisma.service";
import { UsersRepository } from "../../domain/repositories/users.repository";
import { User } from "../../domain/entities/users.entity";
import { UserStatusMapper } from "../mappers/user-status.mapper"; // Importante

@Injectable()
export class PrismaUsersRepository implements UsersRepository {
    constructor(private readonly prisma: PrismaService) {}

    async create(user: User): Promise<User> {
        const created = await this.prisma.user.create({
            data: {
                name: user.name,
                email: user.email,
                password: user.password,
                roleId: user.roleId,
                status: UserStatusMapper.toPrisma(user.status),
            },
        });

        return {
            ...created,
            status: UserStatusMapper.toDomain(created.status),
        };
    }

    async findall(): Promise<User[]> {
        const users = await this.prisma.user.findMany();
        return users.map((u) => ({
            ...u,
            status: UserStatusMapper.toDomain(u.status),
        }));
    }

    async findById(id: number): Promise<User | null> {
        const user = await this.prisma.user.findUnique({ where: { id } });
        if (!user) return null;
        return {
            ...user,
            status: UserStatusMapper.toDomain(user.status),
        };
    }

    async findByEmail(email: string): Promise<User | null> {
        const user = await this.prisma.user.findUnique({ where: { email } });
        if (!user) return null;
        return {
            ...user,
            status: UserStatusMapper.toDomain(user.status),
        };
    }

    async update(id: number, user: User): Promise<User> {
        const updated = await this.prisma.user.update({
            where: { id },
            data: {
                name: user.name,
                email: user.email,
                password: user.password,
                roleId: user.roleId,
                status: UserStatusMapper.toPrisma(user.status),
            },
        });

        return {
            ...updated,
            status: UserStatusMapper.toDomain(updated.status),
        };
    }

    async delete(id: number): Promise<User> {
        const updated = await this.prisma.user.update({
            where: { id },
            data: {
                status: "SUSPENDIDO", // O usa UserStatusMapper.toPrisma(DomainUserStatus.SUSPENDIDO)
            },
        });

        return {
            ...updated,
            status: UserStatusMapper.toDomain(updated.status),
        };
    }
}
