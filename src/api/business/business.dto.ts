import {
  ApiProperty,
  ApiPropertyOptional,
  OmitType,
  PartialType,
} from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  IsArray,
  IsBoolean,
  IsDate,
  IsEnum,
  IsOptional,
  IsString,
} from 'class-validator';

import { UserDTO } from '@src/api/user/user.dto';
import { StatusEnum } from '@src/enums';
import { IBusiness, ISchedule } from '@src/interfaces';
import { parseBoolean } from '@src/util/dto-util';

export class BusinessScheduleDTO implements ISchedule {
  @ApiProperty()
  @IsString()
  day: string;

  @ApiProperty()
  @Transform(({ value }) => value && new Date(value))
  @IsDate()
  opening: Date;

  @ApiProperty()
  @Transform(({ value }) => value && new Date(value))
  @IsDate()
  closing: Date;
}

export class BusinessDTO implements IBusiness {
  @ApiProperty()
  @IsOptional()
  @ApiPropertyOptional()
  id?: string;

  @ApiProperty()
  @IsOptional()
  @ApiPropertyOptional()
  BID?: string;

  @ApiProperty()
  @IsOptional()
  @ApiPropertyOptional()
  slug?: string;

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
  name: string;

  @ApiProperty()
  @IsString()
  location: string;

  @ApiProperty()
  @IsString()
  city: string;

  @ApiProperty()
  @IsString()
  province: string;

  @ApiProperty()
  @IsString()
  businessType: string;

  @ApiProperty()
  @IsString()
  contactPerson: string;

  @ApiProperty()
  @IsString()
  contactNo: string;

  @ApiProperty()
  @IsString()
  description: string;

  @ApiProperty({ isArray: true, type: String })
  @IsOptional()
  @ApiPropertyOptional()
  @IsArray()
  tags?: string[];

  @ApiProperty()
  @ApiProperty()
  @IsString()
  logo: string;

  @ApiProperty()
  @IsString()
  businessPermit: string;

  @ApiProperty({ isArray: true, type: BusinessScheduleDTO })
  @IsArray()
  schedule: BusinessScheduleDTO[];

  @ApiProperty({
    enum: StatusEnum,
  })
  @IsEnum(StatusEnum)
  status: StatusEnum;

  @ApiProperty()
  @Transform(({ value }) => value && parseBoolean(value, 'active'))
  @IsBoolean()
  active: boolean | false;

  @ApiProperty({ type: UserDTO })
  @IsOptional()
  @ApiPropertyOptional()
  user?: UserDTO;
}

export class BusinessRequestDTO extends OmitType(BusinessDTO, [
  'id',
  'BID',
  'slug',
  'user',
  'created',
  'updated',
  'deleted',
] as const) {}

export class CreateBusinessDTO extends BusinessRequestDTO {}

export class UpdateBusinessDTO extends PartialType(BusinessRequestDTO) {}

export class FilterBusinessDTO extends PartialType(
  OmitType(BusinessDTO, [
    'id',
    'user',
    'created',
    'updated',
    'deleted',
    'logo',
    'schedule',
    'status',
  ] as const),
) {
  @ApiProperty({ isArray: true, enum: StatusEnum, type: StatusEnum })
  @IsOptional()
  @ApiPropertyOptional()
  status?: StatusEnum[];
}
