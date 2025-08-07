import { Company } from '../entities/company.entity';

export abstract class CompanyRepository {
  abstract create(company: Company): Promise<Company>;
  abstract findAll(): Promise<Company[]>;
  abstract findById(id: string): Promise<Company | null>;
  abstract findByName(name: string): Promise<Company | null>;
  abstract update(id: string, company: Company): Promise<Company>;
  abstract delete(id: string): Promise<Company>;
}
