import { Body, Controller, Post } from '@nestjs/common';

import { AuthCredentialsDto } from 'src/auth/dto/auth-credentials.dto';
import { AuthTokens } from './auth-tokens.interface';

import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/sign-up')
  signUp(@Body() authCredentialsDto: AuthCredentialsDto): Promise<void> {
    return this.authService.signUp(authCredentialsDto);
  }

  @Post('/sign-in')
  signIn(@Body() authCredentialsDto: AuthCredentialsDto): Promise<AuthTokens> {
    return this.authService.signIn(authCredentialsDto);
  }
}
