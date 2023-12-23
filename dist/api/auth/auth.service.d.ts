import { ConfigType } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { UserDTO } from '@src/api/user/user.dto';
import { UserService } from '@src/api/user/user.service';
import cConfig from '@src/config/common.config';
import { ITokens } from '@src/interfaces';
import { AuthConfirmDTO, AuthDTO, AuthForgotPasswordDTO, AuthResetPasswordDTO, AuthResponseDTO, AuthTokenResponseDTO } from './auth.dto';
export declare class AuthService {
    private jwtService;
    private readonly commonConfig;
    private readonly userService;
    constructor(jwtService: JwtService, commonConfig: ConfigType<typeof cConfig>, userService: UserService);
    login(authDTO: AuthDTO): Promise<AuthResponseDTO>;
    logout(userId: string): Promise<boolean>;
    refreshTokens(userId: string, rt: string): Promise<AuthTokenResponseDTO>;
    getTokens(userId: string, email: string): Promise<ITokens>;
    forgotPassword(authForgotPasswordDTO: AuthForgotPasswordDTO): Promise<boolean>;
    confirm(authConfirmDTO: AuthConfirmDTO): Promise<boolean>;
    resetPassword(authResetPasswordDTO: AuthResetPasswordDTO): Promise<boolean>;
    getCurrentUser(userId: string): Promise<UserDTO>;
}
