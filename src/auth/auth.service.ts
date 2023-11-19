import { Injectable, BadRequestException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { RegisterDTO } from './dtos/register.dto';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { User } from '@prisma/client';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  public async register(registrationData: RegisterDTO) {
    console.log('Registration Data:', registrationData);

    const { email, password, repeatPassword } = registrationData;

    // Validate email format
    if (!this.validateEmail(email)) {
      console.log('Invalid email format');
      throw new BadRequestException('Invalid email format');
    }

    // Validate password length
    if (password.length < 5) {
      throw new BadRequestException(
        'Password must be at least 5 characters long',
      );
    }

    // Validate password equality
    if (password !== repeatPassword) {
      console.log('Passwords do not match:', password, repeatPassword);
      throw new BadRequestException('Passwords do not match');
    }

    // Hash password and create user
    const hashedPassword = await bcrypt.hash(password, 10);
    const userData = { email };
    return this.usersService.create(userData, hashedPassword);
  }

  private validateEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  public async validateUser(email: string, password: string) {
    const user = await this.usersService.getByEmail(email);
    if (
      user &&
      (await bcrypt.compare(password, user.password.hashedPassword))
    ) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  public async createSession(user: any) {
    const payload = { email: user.email, sub: user.id };

    const accessToken = this.jwtService.sign(payload, {
      secret: this.configService.get('jwt.secret'),
      expiresIn: this.configService.get('jwt.expiresIn'),
    });

    return {
      access_token: accessToken,
    };
  }

  async getUserFromToken(token: string): Promise<User | null> {
    try {
      const decodedToken = this.jwtService.verify(token); // Assuming your JWT service can verify tokens
      if (!decodedToken || !decodedToken.sub) {
        console.log('Token verification failed or does not contain sub');
        return null;
      }
      const userId = decodedToken.sub; // Assuming sub contains user ID
      console.log('Decoded user ID:', userId);
      const user = await this.usersService.getById(userId); // Fetch user by ID from your UsersService
  
      if (!user) {
        console.log('User not found');
        return null;
      }
  
      console.log('User details retrieved:', user);
      return user;
    } catch (error) {
      console.error('Error verifying token:', error);
      return null;
    }
  }
}