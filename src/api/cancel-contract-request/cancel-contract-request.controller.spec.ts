import { Test, TestingModule } from '@nestjs/testing';

import { CancelContractRequestController } from './cancel-contract-request.controller';
import { CancelContractRequestService } from './cancel-contract-request.service';

describe('CancelContractRequestController', () => {
  let controller: CancelContractRequestController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CancelContractRequestController],
      providers: [CancelContractRequestService],
    }).compile();

    controller = module.get<CancelContractRequestController>(
      CancelContractRequestController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
