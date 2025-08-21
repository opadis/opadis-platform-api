import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { SupabaseClient } from '@supabase/supabase-js';

@Injectable()
export class SupabaseValidationTokenService {
  constructor(
    @Inject('SUPABASE_CLIENT') private readonly supabase: SupabaseClient,
  ) {}

  async validateToken(token: string) {
    try {
      const { data: user, error } = await this.supabase.auth.getUser(token);

      if (error || !user) {
        throw new UnauthorizedException('Token invalid');
      }

      return {
        success: true,
        user: user.user,
        message: 'Token valido',
      };
    } catch {
      throw new UnauthorizedException('Error al validar el token');
    }
  }
}
