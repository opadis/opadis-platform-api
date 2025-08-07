import { CompanyValidationStatus as DomainCompanyValidationStatus } from '../../domain/enums/company.enum';
import { validation_status as PrismaCompanyValidationStatus } from '@prisma/client';

export class CompanyStatusMapper {
  static toPrisma(
    validation_status: DomainCompanyValidationStatus,
  ): PrismaCompanyValidationStatus {
    return validation_status as PrismaCompanyValidationStatus;
  }

  static toDomain(
    status: PrismaCompanyValidationStatus,
  ): DomainCompanyValidationStatus {
    return status as DomainCompanyValidationStatus;
  }
}
