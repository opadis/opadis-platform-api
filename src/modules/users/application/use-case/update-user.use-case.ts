import { HttpException, Injectable } from '@nestjs/common';
import { UsersRepository } from '../../domain/repositories/users.repository';
import { User } from '../../domain/entities/users.entity';
import { UpdateUserDto } from '../dtos/update-user.dto';
import { UserStatus } from '../../domain/enums/user-status.enum';
import { UserStatusMapper } from '../../infrestructure/mappers/user-status.mapper'; // <--- Importante

@Injectable()
export class UpdateUserCase {
  constructor(private readonly usersRepository: UsersRepository) {}

  async updateUser(id: number, data: UpdateUserDto): Promise<User> {
    try {
      // Validación de estado
      if (data.status) {
        const isValidStatus = Object.values(UserStatus).includes(data.status);
        if (!isValidStatus) {
          throw new HttpException({ Error: 'Estado inválido.' }, 400);
        }
      }

      const user = await this.usersRepository.findById(id);
      if (!user) {
        throw new HttpException('User not found', 404);
      }

      user.name = data.name ?? user.name;
      user.email = data.email ?? user.email;
      user.password = data.password ?? user.password;
      user.roleId = data.roleId ?? user.roleId;
      user.status = data.status
        ? UserStatusMapper.toDomain(data.status)
        : user.status;

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
