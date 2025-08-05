import { UserStatus } from "../enums/user-status.enum";
export class User {
  constructor(
    public id: number,
    public name: string,
    public email: string,
    public password: string,
    public roleId: number,
    public status: UserStatus,
  ) {}
  }