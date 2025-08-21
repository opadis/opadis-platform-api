import { Module } from '@nestjs/common';
import { SupabaseAuthController } from './infrastructure/controller/supabase-auth.controller';
import { SupabaseValidationTokenService } from './application/use-case/validationT.use-case';
import { SupabaseGetUserProfileService } from './application/use-case/getUserProfile.use-case';
import { SupabaseRefreshTokenService } from './application/use-case/refreshT.use-case';
import { SupabaseCreateTestUserService } from './application/use-case/create-test-user.use-case';
import { SupabaseAuthGuard } from './supabase-auth.guard';
import { SupabaseModule } from './supabase.module';

@Module({
  imports: [SupabaseModule],
  controllers: [SupabaseAuthController],
  providers: [
    SupabaseValidationTokenService,
    SupabaseGetUserProfileService,
    SupabaseRefreshTokenService,
    SupabaseCreateTestUserService,
    SupabaseAuthGuard,
  ],
  exports: [
    SupabaseValidationTokenService,
    SupabaseGetUserProfileService,
    SupabaseRefreshTokenService,
    SupabaseAuthGuard,
  ],
})
export class SupabaseAuthModule {}
