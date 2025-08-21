import { IsString, IsEmail } from 'class-validator';

export class ValidateTokenDto {
  @IsString()
  token: string;
}

export class RefreshTokenDto {
  @IsString()
  refresh_token: string;
}

export class CreateTestuserDto {
  @IsEmail()
  email: string;

  @IsString()
  password: string;
}

export class SignInTestUserDto {
  @IsEmail()
  email: string;

  @IsString()
  password: string;
}
