import { HttpException, Injectable } from '@nestjs/common';
import { CompanyRepository } from '../../domain/repositories/company.repository';
import { UpdateCompanyDto } from '../dtos/update-company.dto';
import { Company } from '../../domain/entities/company.entity';

@Injectable()
export class UpdateCompanyUseCase {
  constructor(private company: CompanyRepository) {}

  async updateCompany(id: number, data: UpdateCompanyDto): Promise<Company> {
    try {
      const existCompany = await this.company.findById(id.toString());

      if (!existCompany) {
        throw new HttpException({ Error: 'No se encontró la empresa' }, 404);
      }

      if (data.name) {
        const existCompany = await this.company.findByName(data.name);

        if (existCompany) {
          throw new HttpException(
            { Error: `Ya existe una empresa con el nombre ${data.name}` },
            400,
          );
        }
      }

      const updatedCompany = new Company(
        existCompany.id,
        data.userId ?? existCompany.userId,
        data.name ?? existCompany.name,
        data.municipalityId ?? existCompany.municipalityId,
        data.validationState ?? existCompany.validationState,
        data.rfc ?? existCompany.rfc,
        data.documents ?? existCompany.documents,
      );

      return this.company.update(id.toString(), updatedCompany);
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(
        {
          Error: `Error al actualizar el empleado: ${(error as Error).message}`,
        },
        500,
      );
    }
  }
}
