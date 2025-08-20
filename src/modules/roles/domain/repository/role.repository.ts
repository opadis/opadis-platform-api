import { Role } from '../enteties/role.entity';

export abstract class RoleRepository {
  abstract create(role: Role): Promise<Role>;
  abstract findById(id: number): Promise<Role | null>;
  abstract update(id: number, role: Partial<Role>): Promise<Role>;
  abstract delete(id: number): Promise<void>;
  abstract findAll(): Promise<Role[]>;
  abstract findByName(name: string): Promise<Role | null>;
}
