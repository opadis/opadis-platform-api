import { IsInt, IsOptional, IsString } from 'class-validator';

export class CreatePersonDto {
  @IsInt()
  userId: number;

  @IsString()
  @IsOptional()
  curriculum: string;

  @IsString()
  @IsOptional()
  disabilityType: string;

  @IsString()
  @IsOptional()
  location: string;

  @IsString()
  @IsOptional()
  jobProfile: string;
}
