import { CompanyValidationStatus } from '../../domain/enums/company.enum';
import { IsNumber, IsOptional, IsString, IsEnum } from 'class-validator';

export class UpdateCompanyDto {
  @IsNumber()
  @IsOptional()
  userId?: number;

  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  rfc?: string;

  @IsString()
  @IsOptional()
  documents?: string;

  @IsEnum(CompanyValidationStatus)
  @IsOptional()
  validationState?: CompanyValidationStatus;

  @IsNumber()
  @IsOptional()
  municipalityId?: number;
}
