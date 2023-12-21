import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';
import { ChannelAuthResponse, UserAuthResponse } from 'pusher';

export class PusherRequestDTO {
  @ApiProperty()
  @IsString()
  userId: string;

  @ApiProperty()
  @IsString()
  eventKey: string;

  @ApiProperty()
  @IsString()
  message: string;
}

export class PusherCreateUserRequestDTO {
  @ApiProperty()
  @IsString()
  userId: string;

  @ApiProperty()
  @IsString()
  socketId: string;
}

export class PusherCreateChannelRequestDTO extends PusherCreateUserRequestDTO {
  @ApiProperty()
  @IsString()
  channelName: string;
}

export class PusherUserDTO implements UserAuthResponse {
  @ApiProperty()
  @IsString()
  auth: string;

  @ApiProperty()
  @IsString()
  user_data: string;
}

export class PusherChannelDTO implements ChannelAuthResponse {
  @ApiProperty()
  @IsString()
  auth: string;

  @ApiProperty()
  @IsOptional()
  @ApiPropertyOptional()
  @IsString()
  channel_data?: string;

  @ApiProperty()
  @IsOptional()
  @ApiPropertyOptional()
  @IsString()
  shared_secret?: string;
}
