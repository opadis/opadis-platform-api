import { CompanyValidationStatus } from '../../domain/enums/company.enum';
import { IsNumber, IsOptional, IsString, IsEnum } from 'class-validator';

export class CreateCompanyDto {
  @IsNumber()
  userId: number;

  @IsString()
  name: string;

  @IsString()
  @IsOptional()
  rfc?: string;

  @IsString()
  @IsOptional()
  document?: string;

  @IsEnum(CompanyValidationStatus)
  validationState: CompanyValidationStatus;

  @IsNumber()
  municipalityState: number;
}
