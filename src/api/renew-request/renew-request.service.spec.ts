import { Test, TestingModule } from '@nestjs/testing';

import { RenewRequestService } from './renew-request.service';

describe('RenewRequestService', () => {
  let service: RenewRequestService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RenewRequestService],
    }).compile();

    service = module.get<RenewRequestService>(RenewRequestService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
