import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

describe('AuthService', () => {
  let service: AuthService;
  let usersService: UsersService;
  let jwtService: JwtService;

  const mockUser = { id: 1, username: 'admin', password: 'hashedPass', role: 'admin' };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: UsersService,
          useValue: {
            findByUsername: jest.fn().mockResolvedValue(mockUser),
          },
        },
        {
          provide: JwtService,
          useValue: {
            sign: jest.fn().mockReturnValue('mockToken'),
          },
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    usersService = module.get<UsersService>(UsersService);
    jwtService = module.get<JwtService>(JwtService);
  });

  it('should return a valid JWT token on successful login', async () => {
    jest.spyOn(bcrypt, 'compare').mockResolvedValueOnce(true);
    const result = await service.login({ username: 'admin', password: 'correctPass' });
    expect(result).toEqual({ access_token: 'mockToken' });
  });

  it('should throw an error on invalid credentials', async () => {
    jest.spyOn(bcrypt, 'compare').mockResolvedValueOnce(false);
    await expect(service.login({ username: 'admin', password: 'wrongPass' })).rejects.toThrow();
  });
});
