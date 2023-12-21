import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

import { UserDTO } from '@src/api/user/user.dto';

export class AuthDTO {
  @ApiProperty()
  @IsString()
  email: string;

  @ApiProperty()
  @IsString()
  password: string;
}

export class AuthTokenResponseDTO {
  @ApiProperty()
  @IsString()
  access_token: string;

  @ApiProperty()
  @IsString()
  refresh_token: string;
}

export class AuthResponseDTO extends AuthTokenResponseDTO {
  @ApiProperty({ type: UserDTO })
  user: UserDTO;
}
export class AuthForgotPasswordDTO {
  @ApiProperty()
  @IsString()
  email: string;
}

export class AuthResetPasswordDTO {
  @ApiProperty()
  @IsString()
  userId: string;

  @ApiProperty()
  @IsString()
  password: string;
}

export class AuthConfirmDTO {
  @ApiProperty()
  @IsString()
  userId: string;
}
