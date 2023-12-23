import { UserDTO } from '@src/api/user/user.dto';
export declare class AuthDTO {
    email: string;
    password: string;
}
export declare class AuthTokenResponseDTO {
    access_token: string;
    refresh_token: string;
}
export declare class AuthResponseDTO extends AuthTokenResponseDTO {
    user: UserDTO;
}
export declare class AuthForgotPasswordDTO {
    email: string;
}
export declare class AuthResetPasswordDTO {
    userId: string;
    password: string;
}
export declare class AuthConfirmDTO {
    userId: string;
}
