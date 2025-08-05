import { Module } from "@nestjs/common";
import { PrismaModule } from "src/Connect/prisma.module";
import { UsersController } from "./interfaces/controllers/users.controller";
import { CreateUsersUseCase } from "./application/use-case/create-users.use-case";
import { GetUsersUseCase } from "./application/use-case/get-users.use-case";
import { UpdateUserCase } from "./application/use-case/update-product.use-case";
import { SoftDeletedUserUseCase } from "./application/use-case/soft-deleted-user.use-case";
import { UsersRepository } from "./domain/repositories/users.repository";
import { PrismaUsersRepository } from "./infrestructure/prisma/users.repository";

@Module({
    imports: [PrismaModule],
    controllers: [UsersController],
    providers: [
        CreateUsersUseCase,
        GetUsersUseCase,
        UpdateUserCase,
        SoftDeletedUserUseCase,
        {
            provide: UsersRepository,
            useClass: PrismaUsersRepository,
        },
    ],
})
export class UsersModule {}