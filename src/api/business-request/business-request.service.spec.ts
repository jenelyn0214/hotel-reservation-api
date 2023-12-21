import { Test, TestingModule } from '@nestjs/testing';

import { BusinessRequestService } from './business-request.service';

describe('BusinessRequestService', () => {
  let service: BusinessRequestService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BusinessRequestService],
    }).compile();

    service = module.get<BusinessRequestService>(BusinessRequestService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
