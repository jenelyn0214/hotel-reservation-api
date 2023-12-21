import { Test, TestingModule } from '@nestjs/testing';

import { CheckInRequestController } from './check-in-request.controller';
import { CheckInRequestService } from './check-in-request.service';

describe('CheckInRequestController', () => {
  let controller: CheckInRequestController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CheckInRequestController],
      providers: [CheckInRequestService],
    }).compile();

    controller = module.get<CheckInRequestController>(CheckInRequestController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
