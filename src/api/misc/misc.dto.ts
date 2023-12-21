import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

import { UploadFileResponse } from '@src/interfaces';

export class UploadFileDTO {
  @ApiProperty()
  @IsString()
  file: string;
}

export class UploadFileResponseDTO implements UploadFileResponse {
  @ApiProperty()
  asset_id: string;

  @ApiProperty()
  public_id: string;

  @ApiProperty()
  version: number;

  @ApiProperty()
  version_id: string;

  @ApiProperty()
  signature: string;

  @ApiProperty()
  width: number;

  @ApiProperty()
  height: number;

  @ApiProperty()
  format: string;

  @ApiProperty()
  resource_type: string;

  @ApiProperty()
  created_at: string;

  @ApiProperty()
  type: string;

  @ApiProperty()
  etag: string;

  @ApiProperty()
  placeholder: boolean;

  @ApiProperty()
  url: string;

  @ApiProperty()
  secure_url: string;

  @ApiProperty()
  folder: string;

  @ApiProperty()
  access_mode: string;
}

export class ImageUploadResponseDTO {
  @ApiProperty()
  image: Buffer;

  @ApiProperty()
  mimeType: string;
}
