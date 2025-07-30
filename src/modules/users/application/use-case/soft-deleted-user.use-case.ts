import { HttpException, Injectable } from "@nestjs/common";
import { UsersRepository } from "../../domain/repositories/users.repository";
import { User } from "../../domain/entities/users.entity";
import { UserStatus } from "../../domain/enums/user-status.enum";

@Injectable()
export class SoftDeletedUserUseCase {
    constructor(private readonly usersRepository: UsersRepository) {}

    async softDeletedUser(id: number): Promise<User> {
        try {
            const user = await this.usersRepository.findById(id);
            if (!user) {
                throw new HttpException("User not found", 404);
            }

            user.status = UserStatus.SUSPENDIDO;

            return await this.usersRepository.update(id, user);
        } catch (error) {
            if (error instanceof HttpException) throw error;
            throw new HttpException(
                {
                    Error: `Error intentalo más tarde. Eror: ${(error as Error).message}`,
                },
                500,
            );
        }
    }
}
