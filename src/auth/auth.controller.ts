import { Controller, Post, Body } from '@nestjs/common';
import { ApiTags, ApiBody } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import { LoginDto } from './dto/login.dto';
import { CreateUserDto } from '../users/dto/create-user.dto'

@ApiTags('Auth') 
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService,
    private readonly usersService: UsersService
  ) {}

  @Post('register')
  @ApiBody({ type: CreateUserDto }) 
  async register(@Body() createUserDto:CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Post('login')
  @ApiBody({ type: LoginDto }) 
  async login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }
}
