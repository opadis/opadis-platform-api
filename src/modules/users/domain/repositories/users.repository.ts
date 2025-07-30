import { User } from '../entities/users.entity';

export abstract class UsersRepository {
    abstract create(user: User): Promise<User>;
    abstract findall(): Promise<User[]>;
    abstract findById(id: number): Promise<User | null>;
    abstract findByEmail(email: string): Promise<User | null>;
    abstract update(id: number, user: User): Promise<User>;
    abstract delete(id: number): Promise<User>;
}