import { Test, TestingModule } from '@nestjs/testing';

import { ExtensionRequestController } from './extension-request.controller';
import { ExtensionRequestService } from './extension-request.service';

describe('ExtensionRequestController', () => {
  let controller: ExtensionRequestController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ExtensionRequestController],
      providers: [ExtensionRequestService],
    }).compile();

    controller = module.get<ExtensionRequestController>(
      ExtensionRequestController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
