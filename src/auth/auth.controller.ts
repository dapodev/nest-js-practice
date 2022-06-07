import { Body, Controller, Post } from '@nestjs/common';

import { AuthCredentialsDto } from 'src/tasks/dto/auth-credentials.dto';

import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/sign-up')
  signUp(@Body() authCredentialsDto: AuthCredentialsDto) {
    return this.authService.signUp(authCredentialsDto);
  }
}