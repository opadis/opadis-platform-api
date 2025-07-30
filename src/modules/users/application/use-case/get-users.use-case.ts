import { HttpException, Injectable, HttpStatus } from "@nestjs/common";
import { UsersRepository } from "../../domain/repositories/users.repository";
import { User } from "../../domain/entities/users.entity";

@Injectable()
export class GetUsersUseCase {
    constructor(private usersRepository: UsersRepository) {}
    async getAllUsers (): Promise<User[]> {
        try {
            const users = await this.usersRepository.findall();
            if (!users.length) {
                throw new HttpException('No users found', HttpStatus.NOT_FOUND);
            }
            return users;
        } catch (error) {
            if (error instanceof HttpException) {
                throw error;
            }
            throw new HttpException(
                {
                    Error: `Error intentalo mas tarde. Eror: ${(error as Error).message}`,
                },
                500,
            );
        }
    }

    async getuserById(id: number): Promise<User | null> {
        try {
            const user = await this.usersRepository.findById(id);
            if (!user) {
                throw new HttpException('User not found', HttpStatus.NOT_FOUND);
            }
            return user;
        }
        catch (error) {
            if (error instanceof HttpException) {
                throw error;
            }
            throw new HttpException(
                {
                    Error: `Error intentalo mas tarde. Eror: ${(error as Error).message}`,
                },
                500,
            );
        }
    }
    async getUserByEmail(email: string): Promise<User | null> {
        try {
            const user = await this.usersRepository.findByEmail(email);
            if (!user) {
                throw new HttpException('User not found', HttpStatus.NOT_FOUND);
            }
            return user;
        } catch (error) {
            if (error instanceof HttpException) {
                throw error;
            }
            throw new HttpException(
                {
                    Error: `Error intentalo mas tarde. Eror: ${(error as Error).message}`,
                },
                500,
            );
        }
    }
}