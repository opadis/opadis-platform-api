import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { SupabaseClient } from '@supabase/supabase-js';

@Injectable()
export class SupabaseGetUserProfileService {
  constructor(
    @Inject('SUPABASE_CLIENT') private readonly supabase: SupabaseClient,
  ) {}

  async getUserProfile(token: string) {
    try {
      const { data: user, error } = await this.supabase.auth.getUser(token);

      if (error || !user) {
        throw new UnauthorizedException('Invalid token');
      }

      return {
        success: true,
        user: user.user,
        message: 'Perfil obtenido exitosamente',
      };
    } catch {
      throw new UnauthorizedException('Error al obtener el perfil');
    }
  }
}
