import { Module } from "@nestjs/common";
import { UsersController } from "./users.controller";
import { UserService } from "./users.service";
import { PrismaModule } from "src/Connect/prisma.module";

@Module({
    controllers: [UsersController],
    providers: [UserService],
    imports: [PrismaModule],
})
export class UsersModule {}