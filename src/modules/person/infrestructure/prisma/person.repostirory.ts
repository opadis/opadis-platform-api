import { Injectable } from "@nestjs/common";
import { PersonRepository } from "../../domain/repositories/person.repository";
import { Person } from "../../domain/entities/person.entity";   
import { PrismaService } from "../../../../connect/prisma.service";
import { User } from "src/modules/users/domain/entities/users.entity";
import { UserStatusMapper } from "src/modules/users/infrestructure/mappers/user-status.mapper";

@Injectable()
export class PrismaPersonRepository implements PersonRepository {
  constructor(private readonly prisma: PrismaService) {}

  private mapPrismaUserToDomain(user: any): User {
    return new User(
      user.id,
      user.name,
      user.email,
      user.password,
      user.roleId,
      UserStatusMapper.toDomain(user.status), // mapea a UserStatus
      user.role ?? undefined,
      user.createdAt,
      user.updatedAt,
      user.deletedAt,
    );
  }

  private mapPrismaPersonToDomain(p: any): Person {
    const domainUser = p.user ? this.mapPrismaUserToDomain(p.user) : undefined;
    return new Person(
      p.id,
      p.userId,
      p.curriculum,
      p.disabilityType,
      p.location,
      p.jobProfile,
      p.createdAt,
      p.updatedAt,
      p.deletedAt,
      domainUser,
    );
  }

  async create(person: Person): Promise<Person> {
    const created = await this.prisma.person.create({
      data: {
        userId: person.userId,
        curriculum: person.curriculum ?? null,
        disabilityType: person.disabilityType ?? null,
        location: person.location ?? null,
        jobProfile: person.jobProfile ?? null,
      },
      include: { user: true },
    });

    return this.mapPrismaPersonToDomain(created);
  }

  async findAll(): Promise<Person[]> {
    const persons = await this.prisma.person.findMany({ include: { user: true } });
    return persons.map(this.mapPrismaPersonToDomain);
  }

  async findById(id: string): Promise<Person | null> {
    const person = await this.prisma.person.findUnique({
      where: { id: Number(id) },
      include: { user: true },
    });
    return person ? this.mapPrismaPersonToDomain(person) : null;
  }

  async update(id: string, person: Person): Promise<Person> {
    const updated = await this.prisma.person.update({
      where: { id: Number(id) },
      data: {
        curriculum: person.curriculum ?? null,
        disabilityType: person.disabilityType ?? null,
        location: person.location ?? null,
        jobProfile: person.jobProfile ?? null,
        deletedAt: person.deletedAt ?? null,
      },
      include: { user: true },
    });
    return this.mapPrismaPersonToDomain(updated);
  }

  async delete(id: string): Promise<Person> {
    const deleted = await this.prisma.person.update({
      where: { id: Number(id) },
      data: { deletedAt: new Date() },
      include: { user: true },
    });
    return this.mapPrismaPersonToDomain(deleted);
  }

  async findByEmail(email: string): Promise<Person | null> {
    const person = await this.prisma.person.findFirst({
      where: { user: { email } },
      include: { user: true },
    });
    return person ? this.mapPrismaPersonToDomain(person) : null;
  }
}
