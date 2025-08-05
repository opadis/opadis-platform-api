import { HttpException, Injectable } from "@nestjs/common";
import { UsersRepository } from "../../domain/repositories/users.repository";
import { User } from "../../domain/entities/users.entity";
import { CreateUserDto } from "../dtos/create-user.dto";
import { UserStatus } from "../../domain/enums/user-status.enum";
import { RoleRepository } from "../../../roles/domain/repository/users.repository"; // Importamos el RoleRepository

@Injectable()
export class CreateUsersUseCase {
  constructor(
    private usersRepository: UsersRepository,
    private roleRepository: RoleRepository, // <--- inyectamos RoleRepository
  ) {}

  async createUser(data: CreateUserDto): Promise<User> {
    try {
      const isValidStatus = Object.values(UserStatus).includes(data.status as UserStatus);
      if (!isValidStatus) {
        throw new HttpException({ Error: 'Estado inválido.' }, 400);
      }

      // Validar si el rol existe
      const role = await this.roleRepository.findById(data.roleId);
      if (!role) {
        throw new HttpException({ Error: 'Rol inválido.' }, 400);
      }

      const user = new User(
        0,
        data.name,
        data.email,
        data.password,
        data.roleId,
        data.status as UserStatus,
      );

      return await this.usersRepository.create(user);
    } catch (error) {
      if (error instanceof HttpException) throw error;
      throw new HttpException(
        {
          Error: `Error intentalo más tarde. Error: ${(error as Error).message}`,
        },
        500,
      );
    }
  }
}

