import { Body, Controller, Post, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserService } from 'src/user/user.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  @Post('register')
  async register(@Body() userData: any) {
    return this.userService.create(userData);
  }

  @Post('login')
  async login(@Body() loginData: any) {
    const user = await this.authService.validateUser(
      loginData.username,
      loginData.password,
    );
    if (!user) {
      throw new UnauthorizedException('Credenciales Inválidas');
    }

    return this.authService.login(user);
  }
}
