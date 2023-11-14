import {
  Controller,
  Body,
  Post,
  UseGuards,
  Request,
  Response,
  Delete,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDTO } from './dtos/register.dto';
import { LocalAuthGuard } from './local-auth.guard';
import { JwtAuthGuard } from './jwt.auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/register')
  create(@Body() userData: RegisterDTO) {
    console.log('Controller method reached');
    return this.authService.register(userData);
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req, @Response() res) {
    try {
      const tokens = await this.authService.createSession(req.user);
      res.cookie('auth', tokens, {
        httpOnly: true,
        sameSite: 'None',
        secure: true,
      });
      res.send({
        message: 'success',
      });
    } catch (error) {
      console.error('Login error:', error);
      res.status(500).send({
        message: 'Internal Server Error',
      });
    }
  }

  @UseGuards(JwtAuthGuard)
  @Delete('logout')
  async logout(@Response() res) {
    res.clearCookie('auth', { httpOnly: true });
    res.send({
      message: 'success',
    });
  }
}