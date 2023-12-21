import { Test, TestingModule } from '@nestjs/testing';

import { RefundRequestController } from './refund-request.controller';
import { RefundRequestService } from './refund-request.service';

describe('RefundRequestController', () => {
  let controller: RefundRequestController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RefundRequestController],
      providers: [RefundRequestService],
    }).compile();

    controller = module.get<RefundRequestController>(RefundRequestController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
