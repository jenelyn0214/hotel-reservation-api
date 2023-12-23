import { UserDTO } from '@src/api/user/user.dto';
import { AuthConfirmDTO, AuthDTO, AuthForgotPasswordDTO, AuthResetPasswordDTO, AuthResponseDTO, AuthTokenResponseDTO } from './auth.dto';
import { AuthService } from './auth.service';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    login(authDTO: AuthDTO): Promise<AuthResponseDTO>;
    getCurrentUser(userId: string): Promise<UserDTO>;
    logout(userId: string): Promise<boolean>;
    refreshTokens(userId: string, refreshToken: string): Promise<AuthTokenResponseDTO>;
    forgotPassword(authForgotPasswordDTO: AuthForgotPasswordDTO): Promise<boolean>;
    confirmAccount(authConfirmDTO: AuthConfirmDTO): Promise<boolean>;
    resetPassword(authResetPasswordDTO: AuthResetPasswordDTO): Promise<boolean>;
}
