import { Test, TestingModule } from '@nestjs/testing';

import { OtherInformationController } from './other-information.controller';
import { OtherInformationService } from './other-information.service';

describe('OtherInformationController', () => {
  let controller: OtherInformationController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OtherInformationController],
      providers: [OtherInformationService],
    }).compile();

    controller = module.get<OtherInformationController>(
      OtherInformationController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
