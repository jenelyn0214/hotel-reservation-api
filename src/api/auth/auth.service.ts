import { ForbiddenException, Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

import { UserDTO } from '@src/api/user/user.dto';
import { UserService } from '@src/api/user/user.service';
import cConfig from '@src/config/common.config';
import { IJwtPayload, ITokens } from '@src/interfaces';
import { comparePassword } from '@src/util/password';
// import { sendEmail } from '@src/util/send-email';

import {
  AuthConfirmDTO,
  AuthDTO,
  AuthForgotPasswordDTO,
  AuthResetPasswordDTO,
  AuthResponseDTO,
  AuthTokenResponseDTO,
} from './auth.dto';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    @Inject(cConfig.KEY)
    private readonly commonConfig: ConfigType<typeof cConfig>,
    private readonly userService: UserService,
  ) {}

  async login(authDTO: AuthDTO): Promise<AuthResponseDTO> {
    const users = await this.userService.findByFilter({
      email: authDTO.email,
    });

    if (users.length === 0) throw new ForbiddenException('Access Denied');

    const user: UserDTO = users[0];

    const passwordMatches = comparePassword(authDTO.password, user.password);
    if (!passwordMatches) throw new ForbiddenException('Access Denied');

    const tokens = await this.getTokens(user.id, user.email);

    await this.userService.update(
      user.id,
      {
        refreshToken: tokens.refresh_token,
      },
      true,
    );

    return {
      ...tokens,
      user,
    };
  }

  async logout(userId: string): Promise<boolean> {
    await this.userService.update(userId, {
      refreshToken: null,
    });

    return true;
  }

  async refreshTokens(
    userId: string,
    rt: string,
  ): Promise<AuthTokenResponseDTO> {
    const user = await this.userService.findOne(userId);

    if (!user || !user.refreshToken)
      throw new ForbiddenException('Access Denied no data');

    const rtMatches = user.refreshToken === rt;
    if (!rtMatches) throw new ForbiddenException('Access Denied from rt');

    const tokens = await this.getTokens(user.id, user.email);

    await this.userService.update(user.id, {
      refreshToken: tokens.refresh_token,
    });

    return tokens;
  }

  async getTokens(userId: string, email: string): Promise<ITokens> {
    const jwtPayload: IJwtPayload = {
      sub: userId,
      email: email,
    };

    const [at, rt] = await Promise.all([
      this.jwtService.signAsync(jwtPayload, {
        secret: this.commonConfig.jwt.accessTokenSecret,
        expiresIn: '1d',
      }),
      this.jwtService.signAsync(jwtPayload, {
        secret: this.commonConfig.jwt.refreshTokenSecret,
        expiresIn: '7d',
      }),
    ]);

    return {
      access_token: at,
      refresh_token: rt,
    };
  }

  async forgotPassword(authForgotPasswordDTO: AuthForgotPasswordDTO) {
    const users = await this.userService.findByFilter({
      email: authForgotPasswordDTO.email,
    });

    if (!users) throw new ForbiddenException("Email doesn't exist!");

    return true;
  }

  async confirm(authConfirmDTO: AuthConfirmDTO) {
    const user = await this.userService.findOne(authConfirmDTO.userId);

    if (!user) throw new ForbiddenException('Access Denied');

    await this.userService.update(user.id, {
      // confirmed: true,
    });

    return true;
  }

  async resetPassword(authResetPasswordDTO: AuthResetPasswordDTO) {
    const user = await this.userService.findOne(authResetPasswordDTO.userId);

    if (!user) throw new ForbiddenException('Access Denied');

    await this.userService.update(user.id, {
      password: authResetPasswordDTO.password,
    });

    return true;
  }

  async getCurrentUser(userId: string): Promise<UserDTO> {
    const user = await this.userService.findOne(userId);

    if (!user) throw new ForbiddenException('Access Denied');

    return user;
  }
}
