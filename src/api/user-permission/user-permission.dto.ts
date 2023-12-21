import {
  ApiProperty,
  ApiPropertyOptional,
  OmitType,
  PartialType,
} from '@nestjs/swagger';
import { IsArray, IsOptional, IsString } from 'class-validator';

import { RolePermissionDTO } from '@src/api/role/role.dto';
import { IUserPermission } from '@src/interfaces';

export class UserPermissionDTO implements IUserPermission {
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
  roleId: string;

  @ApiProperty({ isArray: true, type: RolePermissionDTO })
  @IsOptional()
  @ApiPropertyOptional()
  @IsArray()
  permission?: RolePermissionDTO[];
}

export class UserPermissionRequestDTO extends OmitType(UserPermissionDTO, [
  'id',
  'created',
  'updated',
  'deleted',
] as const) {}

export class CreateUserPermissionDTO extends UserPermissionRequestDTO {}

export class UpdateUserPermissionDTO extends PartialType(
  UserPermissionRequestDTO,
) {}

export class FilterUserPermissionDTO extends PartialType(
  OmitType(UserPermissionDTO, [
    'id',
    'created',
    'updated',
    'deleted',
    'permission',
  ] as const),
) {}
