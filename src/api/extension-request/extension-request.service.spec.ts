import { Test, TestingModule } from '@nestjs/testing';

import { ExtensionRequestService } from './extension-request.service';

describe('ExtensionRequestService', () => {
  let service: ExtensionRequestService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ExtensionRequestService],
    }).compile();

    service = module.get<ExtensionRequestService>(ExtensionRequestService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
