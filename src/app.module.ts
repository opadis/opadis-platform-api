import { Module } from '@nestjs/common';
import { UsersModule } from './modules/users/users.module';
import { RoleModule } from './modules/roles/role.module';
import { companyModule } from './modules/company/company.module';
import { SupabaseAuthModule } from './modules/supabase/supabase-auth.module';

@Module({
  imports: [UsersModule, RoleModule, companyModule, SupabaseAuthModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
