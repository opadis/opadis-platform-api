import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  UnauthorizedException,
  UseGuards,
  Request,
} from '@nestjs/common';
import { SupabaseValidationTokenService } from '../../application/use-case/validationT.use-case';
import { SupabaseRefreshTokenService } from '../../application/use-case/refreshT.use-case';
import { SupabaseGetUserProfileService } from '../../application/use-case/getUserProfile.use-case';
import { SupabaseCreateTestUserService } from '../../application/use-case/create-test-user.use-case';
import {
  RefreshTokenDto,
  SignInTestUserDto,
  ValidateTokenDto,
} from '../../application/dto/auth.dto';
import { SupabaseAuthGuard } from '../../supabase-auth.guard';
import { AuthenticatedRequest } from '../../interfaces/types/authenticated-request.interface';

@Controller('auth')
export class SupabaseAuthController {
  constructor(
    private readonly validationService: SupabaseValidationTokenService,
    private readonly refreshService: SupabaseRefreshTokenService,
    private readonly profileService: SupabaseGetUserProfileService,
    private readonly testUserService: SupabaseCreateTestUserService,
  ) {}

  @Post('validate-token')
  @HttpCode(HttpStatus.OK)
  async validateToken(@Body() validateTokenDto: ValidateTokenDto) {
    return await this.validationService.validateToken(validateTokenDto.token);
  }

  @Post('refresh-token')
  @HttpCode(HttpStatus.OK)
  async refreshToken(@Body() refreshTokenDto: RefreshTokenDto) {
    return await this.refreshService.refreshToken(
      refreshTokenDto.refresh_token,
    );
  }

  @Get('profile')
  @UseGuards(SupabaseAuthGuard)
  async getProfile(@Request() req: AuthenticatedRequest) {
    if (!req.user) {
      throw new UnauthorizedException('Usuario no autenticado');
    }

    const authHeader = req.headers.authorization;
    if (!authHeader || typeof authHeader !== 'string') {
      throw new UnauthorizedException('Token no encontrado en el header');
    }

    const token = authHeader.split(' ')[1];
    if (!token) {
      throw new UnauthorizedException('Token no encontrado');
    }

    return await this.profileService.getUserProfile(token);
  }

  @Get('verify')
  @UseGuards(SupabaseAuthGuard)
  verifyToken(@Request() req: AuthenticatedRequest) {
    if (!req.user) {
      throw new UnauthorizedException('Usuario no autenticado');
    }

    return {
      success: true,
      user: req.user,
      message: 'Token valido y usuario autenticado',
    };
  }

  @Post('test/signin')
  @HttpCode(HttpStatus.OK)
  async signInTestestuser(@Body() signInTestUserDto: SignInTestUserDto) {
    return await this.testUserService.signInTestuser(
      signInTestUserDto.email,
      signInTestUserDto.password,
    );
  }

  @Get('test/users')
  @HttpCode(HttpStatus.OK)
  listTestUsers() {
    return this.testUserService.listAuthUsers();
  }
}
