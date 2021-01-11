import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PinoLogger } from 'nestjs-pino/dist';
import { AuthJwtModel } from '../../dto/auth/auth.jwt.model';
import { UserDocument } from '../../schema/user.schema';
import { UserService } from '../user/user.service';
import { PasswordService } from './password.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    private passwordService: PasswordService,
    private logger: PinoLogger,
  ) {}

  async validateUser(username: string, password: string): Promise<UserDocument> {
    // TODO only allow login for verified users!

    try {
      const user = await this.userService.findByUsername(username);
      if (user && await this.passwordService.verify(password, user.passwordHash, user.salt)) {
        return user;
      }
    } catch (e) {
      this.logger.error(`failed to verify user? ${e.message}`)
    }

    return null;
  }

  async login(user: UserDocument): Promise<AuthJwtModel> {
    return new AuthJwtModel({
      accessToken: this.jwtService.sign({
        username: user.username,
        roles: user.roles,
        sub: user.id,
      }),
      refreshToken: this.jwtService.sign({
        sub: user.id,
      }, {
        expiresIn: '30d',
      }),
    });
  }
}
