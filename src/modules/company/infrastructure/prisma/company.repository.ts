import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/Connect/prisma.service';
import { Company } from '../../domain/entities/company.entity';
import { CompanyStatusMapper } from '../mappers/company-status.mapper';
import { CompanyRepository } from '../../domain/repositories/company.repository';

@Injectable()
export class CompanyPrismaRepository extends CompanyRepository {
  constructor(private prisma: PrismaService) {
    super();
  }

  async create(company: Company): Promise<Company> {
    const created = await this.prisma.company.create({
      data: {
        userId: company.userId,
        name: company.name,
        municipalityId: company.municipalityId,
        validationState: CompanyStatusMapper.toPrisma(company.validationState),
        rfc: company.rfc,
        documents: company.documents,
      },
    });

    return new Company(
      created.id,
      created.userId,
      created.name,
      created.municipalityId,
      CompanyStatusMapper.toDomain(created.validationState),
      created.rfc ?? undefined,
      created.documents ?? undefined,
    );
  }

  async findAll(): Promise<Company[]> {
    const companies = await this.prisma.company.findMany({
      where: { deletedAt: null },
    });

    return companies.map(
      (company) =>
        new Company(
          company.id,
          company.userId,
          company.name,
          company.municipalityId,
          CompanyStatusMapper.toDomain(company.validationState),
          company.rfc ?? undefined,
          company.documents ?? undefined,
        ),
    );
  }

  async findById(id: string): Promise<Company | null> {
    const company = await this.prisma.company.findFirst({
      where: { id: parseInt(id), deletedAt: null },
    });

    if (!company) return null;

    return new Company(
      company.id,
      company.userId,
      company.name,
      company.municipalityId,
      CompanyStatusMapper.toDomain(company.validationState),
      company.rfc ?? undefined,
      company.documents ?? undefined,
    );
  }

  async findByName(name: string): Promise<Company | null> {
    const company = await this.prisma.company.findFirst({
      where: { name, deletedAt: null },
    });

    if (!company) return null;

    return new Company(
      company.id,
      company.userId,
      company.name,
      company.municipalityId,
      CompanyStatusMapper.toDomain(company.validationState),
      company.rfc ?? undefined,
      company.documents ?? undefined,
    );
  }

  async update(id: string, companyData: Company): Promise<Company> {
    const updated = await this.prisma.company.update({
      where: { id: parseInt(id) },
      data: {
        userId: companyData.userId,
        name: companyData.name,
        municipalityId: companyData.municipalityId,
        validationState: CompanyStatusMapper.toPrisma(
          companyData.validationState,
        ),
        rfc: companyData.rfc,
        documents: companyData.documents,
      },
    });

    return new Company(
      updated.id,
      updated.userId,
      updated.name,
      updated.municipalityId,
      CompanyStatusMapper.toDomain(updated.validationState),
      updated.rfc ?? undefined,
      updated.documents ?? undefined,
    );
  }

  async delete(id: string): Promise<Company> {
    const deleted = await this.prisma.company.update({
      where: { id: parseInt(id) },
      data: { deletedAt: new Date() },
    });

    return new Company(
      deleted.id,
      deleted.userId,
      deleted.name,
      deleted.municipalityId,
      CompanyStatusMapper.toDomain(deleted.validationState),
      deleted.rfc ?? undefined,
      deleted.documents ?? undefined,
    );
  }
}
