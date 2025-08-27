import { Module } from "@nestjs/common";
import { PrismaModule } from "src/connect/prisma.module";
import { PersonController } from "./interfaces/controllers/person.controller";
import { CreatePersonUseCase } from "./aplication/use-case/create-person.use-case";
import { getPersonUseCase } from "./aplication/use-case/get-person,use-case";
import { UpdatePersonUseCase } from "./aplication/use-case/update-person.use-case";
import { SoftDeletedPersonUseCase } from "./aplication/use-case/soft-deleted-person.use-case";
import { PersonRepository } from "./domain/repositories/person.repository";
import { PrismaPersonRepository } from "./infrestructure/prisma/person.repostirory";
import { UsersModule } from "../users/users.module";

@Module({
  imports: [PrismaModule, UsersModule],
  controllers: [PersonController],
  providers: [
    CreatePersonUseCase,
    getPersonUseCase,
    UpdatePersonUseCase,
    SoftDeletedPersonUseCase,
    {
      provide: PersonRepository,
      useClass: PrismaPersonRepository,
    },
  ],
})
export class PersonModule {}