import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CreateCompanyUseCase } from '../../aplication/use-case/create-company.use-case';
import { UpdateCompanyUseCase } from '../../aplication/use-case/update-company.use-case';
import { SoftDeletedCompanyUseCase } from '../../aplication/use-case/soft-deleted-company.use-case';
import { getCompanyUseCase } from '../../aplication/use-case/get-company.use-case';
import { Company } from '../../domain/entities/company.entity';
import { CreateCompanyDto } from '../../aplication/dtos/create-company.dto';
import { UpdateCompanyDto } from '../../aplication/dtos/update-company.dto';

@Controller('company')
export class CompanyController {
  constructor(
    private readonly Get: getCompanyUseCase,
    private readonly created: CreateCompanyUseCase,
    private readonly updated: UpdateCompanyUseCase,
    private readonly deleted: SoftDeletedCompanyUseCase,
  ) {}

  @Get()
  async getAllCompany(): Promise<Company[]> {
    return this.Get.getAllCompany();
  }

  @Get(':id')
  async getCompanyById(@Param('id') id: number): Promise<Company> {
    return this.Get.getByIdCompany(id);
  }

  @Post()
  async createCompany(
    @Body() CreateCompanyDto: CreateCompanyDto,
  ): Promise<Company> {
    return this.created.createCompany(CreateCompanyDto);
  }

  @Put(':id')
  async updateCompany(
    @Param('id') id: number,
    @Body() updateCompanyDto: UpdateCompanyDto,
  ): Promise<Company> {
    return this.updated.updateCompany(id, updateCompanyDto);
  }

  @Delete('id')
  async deleteCompany(@Param(':id') id: number): Promise<Company> {
    return this.deleted.softDeleteCompany(id);
  }
}
