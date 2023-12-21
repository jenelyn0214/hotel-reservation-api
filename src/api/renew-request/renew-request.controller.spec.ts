import { Test, TestingModule } from '@nestjs/testing';

import { RenewRequestController } from './renew-request.controller';
import { RenewRequestService } from './renew-request.service';

describe('RenewRequestController', () => {
  let controller: RenewRequestController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RenewRequestController],
      providers: [RenewRequestService],
    }).compile();

    controller = module.get<RenewRequestController>(RenewRequestController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
