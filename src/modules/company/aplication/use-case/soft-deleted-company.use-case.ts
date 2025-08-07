import { HttpException, Injectable } from '@nestjs/common';
import { CompanyRepository } from '../../domain/repositories/company.repository';
import { Company } from '../../domain/entities/company.entity';

@Injectable()
export class SoftDeletedCompanyUseCase {
  constructor(private company: CompanyRepository) {}

  async softDeleteCompany(id: number): Promise<Company> {
    try {
      const company = await this.company.delete(id.toString());

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
          Error: `Error al eliminar la empresa: ${(error as Error).message}`,
        },
        500,
      );
    }
  }
}
