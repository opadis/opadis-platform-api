import { HttpException, Injectable } from "@nestjs/common";
import { PrismaService } from "src/Connect/prisma.service";
import {user, status} from "@prisma/client";

@Injectable()
export class UserService{
    constructor(private prisma : PrismaService){}

    async getAllusers():Promise<user[]>{
        try {
            return await this.prisma.user.findMany({
                where: {
                    deletedAt: null
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
    async getuserById(id: number): Promise<user | null> {
        try {
            return await this.prisma.user.findUnique({
                where: {
                    id: id,
                    deletedAt: null
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
    async createuser(data:{
        name: string,
        email: string,
        password: string,
        roleId: number,
        status: status;
    }): Promise<user> {
        try {
            return await this.prisma.user.create({
                data: {
                    name: data.name,
                    email: data.email,
                    password: data.password,
                    roleId: data.roleId,
                    status: data.status
                },
                include: {
                    role: true
                },
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
    async updateUser(
        id: number,
        data: {
            name?: string,
            email?: string,
            password?: string,
            roleId?: number,
            status?: status
        }
    ): Promise<user> {
        try {
            return await this.prisma.user.update({
                where: {
                    id: id
                },
                data: {
                    name: data.name,
                    email: data.email,
                    password: data.password,
                    roleId: data.roleId,
                    status: data.status
                },
                include: {
                    role: true
                },
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
    async deleteUser(id: number): Promise<user> {
        try {
            return await this.prisma.user.update({
                where: {
                    id: id
                },
                data: {
                    deletedAt: new Date()
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