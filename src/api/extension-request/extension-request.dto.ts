import {
  ApiProperty,
  ApiPropertyOptional,
  OmitType,
  PartialType,
} from '@nestjs/swagger';
import { IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';

import { RentDTO } from '@src/api/rent/rent.dto';
import { UserDTO } from '@src/api/user/user.dto';
import { StatusEnum } from '@src/enums';
import { IExtensionRequest } from '@src/interfaces';

export class ExtensionRequestDTO implements IExtensionRequest {
  @ApiProperty()
  @IsOptional()
  @ApiPropertyOptional()
  id?: string;

  @ApiProperty()
  @IsOptional()
  @ApiPropertyOptional()
  created?: Date;

  @ApiProperty()
  @IsOptional()
  @ApiPropertyOptional()
  updated?: Date;

  @ApiProperty()
  @IsOptional()
  @ApiPropertyOptional()
  deleted?: Date;

  @ApiProperty()
  @IsString()
  userId: string;

  @ApiProperty()
  @IsString()
  rentId: string;

  @ApiProperty()
  @IsNumber()
  duration: number;

  @ApiProperty({
    enum: StatusEnum,
  })
  @IsEnum(StatusEnum)
  status: StatusEnum;

  @ApiProperty()
  @IsOptional()
  @ApiPropertyOptional()
  @IsString()
  rejectReason?: string | null;

  @ApiProperty({ type: UserDTO })
  @IsOptional()
  @ApiPropertyOptional()
  user?: UserDTO;

  @ApiProperty({ type: RentDTO })
  @IsOptional()
  @ApiPropertyOptional()
  rent?: RentDTO;
}

export class ExtensionRequestRequestDTO extends OmitType(ExtensionRequestDTO, [
  'id',
  'user',
  'rent',
  'created',
  'updated',
  'deleted',
] as const) {}

export class CreateExtensionRequestDTO extends ExtensionRequestRequestDTO {}

export class UpdateExtensionRequestDTO extends PartialType(
  ExtensionRequestRequestDTO,
) {}

export class FilterExtensionRequestDTO extends PartialType(
  OmitType(ExtensionRequestDTO, [
    'id',
    'user',
    'rent',
    'created',
    'updated',
    'deleted',
    'status',
  ] as const),
) {
  @ApiProperty({ isArray: true, enum: StatusEnum, type: StatusEnum })
  @IsOptional()
  @ApiPropertyOptional()
  status?: StatusEnum[];
}
