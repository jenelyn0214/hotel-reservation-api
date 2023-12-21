import { Body, Controller, Get, Param, Post, Query, Res } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

import { Public } from '@src/common/decorators';

import {
  ImageUploadResponseDTO,
  UploadFileDTO,
  UploadFileResponseDTO,
} from './misc.dto';
import { MiscService } from './misc.service';

@ApiTags('misc')
@Controller('misc')
export class MiscController {
  constructor(private readonly miscService: MiscService) {}

  @Public()
  @Post('/upload')
  @ApiResponse({
    type: UploadFileResponseDTO,
  })
  async upload(
    @Body() uploadFileData: UploadFileDTO,
  ): Promise<UploadFileResponseDTO> {
    return this.miscService.upload(uploadFileData);
  }

  @Public()
  @Get('/upload')
  @ApiResponse({
    schema: { type: 'string', format: 'binary' },
  })
  async getUploadedImage(@Query('id') id: string, @Res() response) {
    const image: ImageUploadResponseDTO =
      await this.miscService.getUploadedImage(id);

    response.setHeader('Content-Type', image.mimeType);
    response.send(image.image);
  }
}
