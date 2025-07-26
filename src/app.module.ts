import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { RoleModule } from './Role/role.module';

@Module({
  imports: [
    UsersModule,
    RoleModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
