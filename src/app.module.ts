import { Module } from '@nestjs/common';
import { UsersModule } from './modules/users/users.module';
import { RoleModule } from './modules/roles/role.module';
import { companyModule } from './modules/company/company.module';
import { PersonModule } from './modules/person/person.module';

@Module({
  imports: [UsersModule, RoleModule, companyModule, PersonModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
