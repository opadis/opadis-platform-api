import { IsOptional, IsString } from 'class-validator';

export class UpdatePersonDto {
  @IsString()
  @IsOptional()
  curriculum?: string;

  @IsString()
  @IsOptional()
  disabilityType?: string;

  @IsString()
  @IsOptional()
  location?: string;

  @IsString()
  @IsOptional()
  jobProfile?: string;
}
