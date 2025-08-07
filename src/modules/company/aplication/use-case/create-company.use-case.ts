import { HttpException, Injectable } from '@nestjs/common';
import { CompanyRepository } from '../../domain/repositories/company.repository';
import { CreateCompanyDto } from '../dtos/create-compant.dto';
import { Company } from '../../domain/entities/company.entity';
import { CompanyValidationStatus } from '../../domain/enums/company.enum';

@Injectable()
export class CreateCompanyUseCase {
  constructor(private company: CompanyRepository) {}

  async createCompany(data: CreateCompanyDto): Promise<Company> {
    try {
      const existCompany = await this.company.findByName(data.name);

      if (existCompany) {
        throw new HttpException(
          {
            Error: `Ya existe una empresa con el nombre ${data.name}`,
          },
          400,
        );
      }

      const isValidValidationStatus = Object.values(
        CompanyValidationStatus,
      ).includes(data.validationState);

      if (!isValidValidationStatus) {
        throw new HttpException(
          {
            Error: `El estado de validación ${data.validationState} no es válido`,
          },
          400,
        );
      }

      const newCompany = new Company(
        0,
        data.userId,
        data.name,
        data.municipalityState,
        data.validationState,
        data.rfc,
        data.document,
      );

      return await this.company.create(newCompany);
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(
        {
          Error: `Error al crear el equipo: ${(error as Error).message}`,
        },
        500,
      );
    }
  }
}
