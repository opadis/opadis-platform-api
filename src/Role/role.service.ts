import { Injectable, HttpException } from '@nestjs/common';
import { PrismaService } from 'src/Connect/prisma.service';
import { role } from '@prisma/client';

@Injectable()
export class RoleService {
    constructor(private prisma : PrismaService){}

    async getAllroles(): Promise<role[]> {
        try{
            return await this.prisma.role.findMany({});
        } catch (error) {
            throw new HttpException(
                {
                    Error: `Error intentalo mas tarde. Eror: ${(error as Error).message}`,
                },
                500,
            );
        }
    }
    async getRoleById(id: number): Promise<role | null> {
        try {
            return await this.prisma.role.findUnique({
                where: {
                    id: id
                }
            });
        } catch (error) {
            throw new HttpException(
                {
                    Error: `Error intentalo mas tarde. Eror: ${(error as Error).message}`,
                },
                500,
            );
        }
    }
    async createRole(data: { role: string }): Promise<role> {
        try {
            return await this.prisma.role.create({
                data: {
                    name: data.role
                }
            });
        } catch (error) {
            throw new HttpException(
                {
                    Error: `Error intentalo mas tarde. Eror: ${(error as Error).message}`,
                },
                500,
            );
        }
    }
    async updateRole(id: number, data: { role: string }): Promise<role> {
        try {
            return await this.prisma.role.update({
                where: {
                    id: id
                },
                data: {
                    name: data.role
                }
            });
        } catch (error) {
            throw new HttpException(
                {
                    Error: `Error intentalo mas tarde. Eror: ${(error as Error).message}`,
                },
                500,
            );
        }
    }
    async deleteRole(id: number): Promise<role> {
        try {
            return await this.prisma.role.delete({
                where: {
                    id: id
                }
            });
        } catch (error) {
            throw new HttpException(
                {
                    Error: `Error intentalo mas tarde. Eror: ${(error as Error).message}`,
                },
                500,
            );
        }
    }
}