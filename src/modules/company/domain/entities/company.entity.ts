import { CompanyValidationStatus } from '../enums/company.enum';

export class Company {
  constructor(
    public id: number,
    public userId: number,
    public name: string,
    public municipalityId: number,
    public validationState: CompanyValidationStatus,
    public rfc?: string,
    public documents?: string,
  ) {}
}
