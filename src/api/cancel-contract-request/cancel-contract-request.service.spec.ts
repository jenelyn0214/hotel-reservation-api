import { Test, TestingModule } from '@nestjs/testing';

import { CancelContractRequestService } from './cancel-contract-request.service';

describe('CancelContractRequestService', () => {
  let service: CancelContractRequestService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CancelContractRequestService],
    }).compile();

    service = module.get<CancelContractRequestService>(
      CancelContractRequestService,
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
