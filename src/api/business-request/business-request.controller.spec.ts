import { Test, TestingModule } from '@nestjs/testing';

import { BusinessRequestController } from './business-request.controller';
import { BusinessRequestService } from './business-request.service';

describe('BusinessRequestController', () => {
  let controller: BusinessRequestController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BusinessRequestController],
      providers: [BusinessRequestService],
    }).compile();

    controller = module.get<BusinessRequestController>(
      BusinessRequestController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
