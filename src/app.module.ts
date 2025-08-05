import { Module } from '@nestjs/common';
import { UsersModule } from './modules/users/users.module';
import { RoleModule } from './modules/roles/role.module';
@Module({
  imports: [
    UsersModule,
    RoleModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
