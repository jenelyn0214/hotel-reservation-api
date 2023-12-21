import {
  ApiProperty,
  ApiPropertyOptional,
  OmitType,
  PartialType,
} from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsArray, IsBoolean, IsOptional, IsString } from 'class-validator';

import { IRole, IRolePermission } from '@src/interfaces';
import { parseBoolean } from '@src/util/dto-util';

export class RolePermissionDTO implements IRolePermission {
  @ApiProperty()
  @IsOptional()
  @ApiPropertyOptional()
  id?: any;

  @ApiProperty()
  @IsString()
  feature: string;

  @ApiProperty()
  @Transform(({ value }) => value && parseBoolean(value, 'add'))
  @IsBoolean()
  add: boolean | false;

  @ApiProperty()
  @Transform(({ value }) => value && parseBoolean(value, 'edit'))
  @IsBoolean()
  edit: boolean | false;

  @ApiProperty()
  @Transform(({ value }) => value && parseBoolean(value, 'view'))
  @IsBoolean()
  view: boolean | false;

  @ApiProperty()
  @Transform(({ value }) => value && parseBoolean(value, 'delete'))
  @IsBoolean()
  delete: boolean | false;

  @ApiProperty()
  @Transform(({ value }) => value && parseBoolean(value, 'viewGlobal'))
  @IsBoolean()
  viewGlobal: boolean | false;
}

export class RoleDTO implements IRole {
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
  role: string;

  @ApiProperty({ isArray: true, type: RolePermissionDTO })
  @IsOptional()
  @ApiPropertyOptional()
  @IsArray()
  defaultPermissions?: RolePermissionDTO[];
}

export class RoleRequestDTO extends OmitType(RoleDTO, [
  'id',
  'created',
  'updated',
  'deleted',
] as const) {}

export class CreateRoleDTO extends RoleRequestDTO {}

export class UpdateRoleDTO extends PartialType(RoleRequestDTO) {}

export class FilterRoleDTO extends PartialType(
  OmitType(RoleDTO, [
    'id',
    'created',
    'updated',
    'deleted',
    'defaultPermissions',
  ] as const),
) {}
