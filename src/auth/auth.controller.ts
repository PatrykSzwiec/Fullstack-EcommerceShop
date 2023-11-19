import {
  Controller,
  Body,
  Post,
  UseGuards,
  Request,
  Response,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Headers,
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
        if (tokens && tokens.access_token) { // Upewnij się, że tokens zawiera access_token
          res.cookie('auth', tokens, {
            httpOnly: true,
            sameSite: 'None',
            secure: true,
          });
          res.send({
            message: 'success',
            access_token: tokens.access_token // Dodaj access_token do odpowiedzi
          });
        } else {
          res.status(500).send({ message: 'Token not generated' }); // W przypadku braku tokens/access_token w odpowiedzi
        }
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

  @Get('/user')
  async getUserFromToken(@Headers('authorization') authorization: string) {
    if (!authorization) {
      throw new HttpException('Authorization header not provided', HttpStatus.UNAUTHORIZED);
    }
    const token = authorization.replace('Bearer ', ''); // Remove 'Bearer ' prefix
    const user = await this.authService.getUserFromToken(token); // Implement this in AuthService
    if (!user) {
      throw new HttpException('Invalid token', HttpStatus.UNAUTHORIZED);
    }
    return user;
  }


}