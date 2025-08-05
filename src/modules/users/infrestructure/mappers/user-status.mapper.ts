import { UserStatus as DomainUserStatus } from '../../domain/enums/user-status.enum';
import { status as PrismaUserStatus } from '@prisma/client';

export class UserStatusMapper {
  static toPrisma(status: DomainUserStatus): PrismaUserStatus {
    return status as PrismaUserStatus;
  }

  static toDomain(status: PrismaUserStatus): DomainUserStatus {
    return status as DomainUserStatus;
  }
}
