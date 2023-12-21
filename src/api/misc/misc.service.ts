import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { SharpService } from 'nestjs-sharp';

import cloudinaryConfig from '@src/config/cloudinary.config';
import { AxiosClient } from '@src/util/axios-client';

import {
  ImageUploadResponseDTO,
  UploadFileDTO,
  UploadFileResponseDTO,
} from './misc.dto';
@Injectable()
export class MiscService {
  constructor(
    @Inject(cloudinaryConfig.KEY)
    private readonly cloudConfig: ConfigType<typeof cloudinaryConfig>,
    private readonly sharpService: SharpService,
  ) {}

  async upload(data: UploadFileDTO): Promise<UploadFileResponseDTO> {
    const cloudinaryAxiosClient = new AxiosClient(this.cloudConfig.url).init();

    const result = await cloudinaryAxiosClient.post('image/upload', {
      file: data.file,
      upload_preset: this.cloudConfig.preset,
    });

    return result.data as UploadFileResponseDTO;
  }

  async getUploadedImage(id: string): Promise<ImageUploadResponseDTO> {
    const cloudinaryAxiosClient = new AxiosClient(
      this.cloudConfig.imageUrl,
    ).init();

    const result = await cloudinaryAxiosClient.get(`image/upload/${id}`, {
      responseType: 'arraybuffer',
    });

    const webPImageBuffer = await this.sharpService
      .edit(result.data)
      .webp()
      .toBuffer();

    return {
      image: webPImageBuffer,
      mimeType: 'image/webp',
    };
  }
}
