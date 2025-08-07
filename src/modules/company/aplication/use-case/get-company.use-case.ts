import { HttpException, Injectable } from '@nestjs/common';
import { CompanyRepository } from '../../domain/repositories/company.repository';
import { Company } from '../../domain/entities/company.entity';

@Injectable()
export class getCompanyUseCase {
  constructor(private company: CompanyRepository) {}

  async getAllCompany(): Promise<Company[]> {
    try {
      const companys = await this.company.findAll();

      if (!companys.length) {
        throw new HttpException(
          {
            Error: 'No se encontraron empresas',
          },
          404,
        );
      }
      return companys;
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

  async getByIdCompany(id: number): Promise<Company> {
    try {
      const company = await this.company.findById(id.toString());

      if (!company) {
        throw new HttpException({ Error: 'No se encontró la empresa' }, 404);
      }

      return company;
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

  async getByNameCompany(name: string): Promise<Company> {
    try {
      const company = await this.company.findByName(name);

      if (!company) {
        throw new HttpException({ Error: 'No se encontró la empresa' }, 404);
      }

      return company;
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
