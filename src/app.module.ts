import { Module } from '@nestjs/common';
import { UsersModule } from './modules/users/users.module';
import { RoleModule } from './modules/roles/role.module';
import { companyModule } from './modules/company/company.module';

@Module({
  imports: [UsersModule, RoleModule, companyModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
