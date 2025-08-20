import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/connect/prisma.module';
import { RoleRepository } from './domain/repository/role.repository';
import { RoleController } from './infrestructure/controllers/role.controller';
import { CreateRoleUseCase } from './application/use-case/create-role.use-case';
import { GetRoleUseCase } from './application/use-case/get-role.use-case';
import { UpdateRoleUseCase } from './application/use-case/update-role.use-case';
import { SoftDeletedRoleUseCase } from './application/use-case/soft-deleted-role.use-case';
import { PrismaRoleRepository } from './interfaces/prisma/role.repository';

@Module({
  imports: [PrismaModule],
  controllers: [RoleController],
  providers: [
    CreateRoleUseCase,
    GetRoleUseCase,
    UpdateRoleUseCase,
    SoftDeletedRoleUseCase,
    {
      provide: RoleRepository,
      useClass: PrismaRoleRepository,
    },
  ],
  exports: [RoleRepository], // <-- Agrega esta línea
})
export class RoleModule {}
