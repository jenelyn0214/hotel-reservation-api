import {
  ApiProperty,
  ApiPropertyOptional,
  OmitType,
  PartialType,
} from '@nestjs/swagger';
import { IsEnum, IsOptional, IsString } from 'class-validator';

import { RentDTO } from '@src/api/rent/rent.dto';
import { UserDTO } from '@src/api/user/user.dto';
import { StatusEnum } from '@src/enums';
import { IConsumeRequest } from '@src/interfaces';

export class ConsumeRequestDTO implements IConsumeRequest {
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

export class ConsumeRequestRequestDTO extends OmitType(ConsumeRequestDTO, [
  'id',
  'user',
  'rent',
  'created',
  'updated',
  'deleted',
] as const) {}

export class CreateConsumeRequestDTO extends ConsumeRequestRequestDTO {}

export class UpdateConsumeRequestDTO extends PartialType(
  ConsumeRequestRequestDTO,
) {}

export class FilterConsumeRequestDTO extends PartialType(
  OmitType(ConsumeRequestDTO, [
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
