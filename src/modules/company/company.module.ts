import { Module } from '@nestjs/common';
import { CompanyController } from './interfaces/controllers/company.controller';
import { getCompanyUseCase } from './aplication/use-case/get-company.use-case';
import { CreateCompanyUseCase } from './aplication/use-case/create-company.use-case';
import { UpdateCompanyUseCase } from './aplication/use-case/update-company.use-case';
import { SoftDeletedCompanyUseCase } from './aplication/use-case/soft-deleted-company.use-case';
import { CompanyRepository } from './domain/repositories/company.repository';
import { CompanyPrismaRepository } from './infrastructure/prisma/company.repository';
import { PrismaModule } from 'src/connect/prisma.module';

@Module({
  controllers: [CompanyController],
  providers: [
    getCompanyUseCase,
    CreateCompanyUseCase,
    UpdateCompanyUseCase,
    SoftDeletedCompanyUseCase,
    {
      provide: CompanyRepository,
      useClass: CompanyPrismaRepository,
    },
  ],
  imports: [PrismaModule],
})
export class companyModule {}
