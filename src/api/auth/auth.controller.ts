import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

import { UserDTO } from '@src/api/user/user.dto';
import {
  GetCurrentUser,
  GetCurrentUserId,
  Public,
} from '@src/common/decorators';
import { RtGuard } from '@src/common/guards';

import {
  AuthConfirmDTO,
  AuthDTO,
  AuthForgotPasswordDTO,
  AuthResetPasswordDTO,
  AuthResponseDTO,
  AuthTokenResponseDTO,
} from './auth.dto';
import { AuthService } from './auth.service';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    type: AuthResponseDTO,
  })
  login(@Body() authDTO: AuthDTO): Promise<AuthResponseDTO> {
    return this.authService.login(authDTO);
  }

  @Get('user')
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    type: UserDTO,
  })
  getCurrentUser(@GetCurrentUserId() userId: string): Promise<UserDTO> {
    return this.authService.getCurrentUser(userId);
  }

  @Post('logout')
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    type: Boolean,
  })
  logout(@GetCurrentUserId() userId: string): Promise<boolean> {
    return this.authService.logout(userId);
  }

  @Public()
  @UseGuards(RtGuard)
  @Post('refresh-token')
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    type: AuthTokenResponseDTO,
  })
  refreshTokens(
    @GetCurrentUserId() userId: string,
    @GetCurrentUser('refreshToken') refreshToken: string,
  ): Promise<AuthTokenResponseDTO> {
    return this.authService.refreshTokens(userId, refreshToken);
  }

  @Public()
  @Post('forgot-password')
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    type: Boolean,
  })
  forgotPassword(
    @Body() authForgotPasswordDTO: AuthForgotPasswordDTO,
  ): Promise<boolean> {
    return this.authService.forgotPassword(authForgotPasswordDTO);
  }

  @Public()
  @Post('confirm')
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    type: Boolean,
  })
  confirmAccount(@Body() authConfirmDTO: AuthConfirmDTO): Promise<boolean> {
    return this.authService.confirm(authConfirmDTO);
  }

  @Public()
  @Post('reset-password')
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    type: Boolean,
  })
  resetPassword(
    @Body() authResetPasswordDTO: AuthResetPasswordDTO,
  ): Promise<boolean> {
    return this.authService.resetPassword(authResetPasswordDTO);
  }
}
