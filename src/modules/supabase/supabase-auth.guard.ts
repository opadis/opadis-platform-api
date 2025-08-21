import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
  Logger,
} from '@nestjs/common';
import { SupabaseValidationTokenService } from './application/use-case/validationT.use-case';
import {
  SupabaseUser,
  AuthenticatedRequest,
} from './interfaces/types/authenticated-request.interface';
import { ValidationResult } from './interfaces/types/validation-result.interface';

@Injectable()
export class SupabaseAuthGuard implements CanActivate {
  private readonly logger = new Logger(SupabaseAuthGuard.name);

  constructor(
    private readonly validationTokenService: SupabaseValidationTokenService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<AuthenticatedRequest>();
    const authHeader = request.headers.authorization;

    if (!authHeader || typeof authHeader !== 'string') {
      throw new UnauthorizedException('Token No encontrado o formato invalido');
    }

    const token = authHeader.split(' ')[1];
    if (!token) {
      throw new UnauthorizedException('Token no encontrado');
    }
    try {
      const result: ValidationResult =
        await this.validationTokenService.validateToken(token);

      if (result.success && result.user) {
        request.user = result.user as SupabaseUser;
        this.logger.log(
          `token validation successful for user: ${
            result.user.email ?? result.user.id
          }`,
        );
        return true;
      }
      throw new UnauthorizedException('Token invalido');
    } catch (error: unknown) {
      // Manejo type-safe del error
      const errorMessage = this.extractErrorMessage(error);
      this.logger.error(`Token validation failed: ${errorMessage}`);
      throw new UnauthorizedException('Token inválido');
    }
  }

  /**
   * Extrae el mensaje de error de forma type-safe
   */
  private extractErrorMessage(error: unknown): string {
    if (error instanceof Error) {
      return error.message;
    }

    if (typeof error === 'string') {
      return error;
    }

    if (
      error &&
      typeof error == 'object' &&
      'message' in error &&
      typeof (error as { message: unknown }).message === 'string'
    ) {
      return (error as { message: string }).message;
    }

    return 'Unknown error';
  }
}
