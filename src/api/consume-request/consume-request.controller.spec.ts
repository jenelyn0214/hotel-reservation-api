import { Test, TestingModule } from '@nestjs/testing';

import { ConsumeRequestController } from './consume-request.controller';
import { ConsumeRequestService } from './consume-request.service';

describe('ConsumeRequestController', () => {
  let controller: ConsumeRequestController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ConsumeRequestController],
      providers: [ConsumeRequestService],
    }).compile();

    controller = module.get<ConsumeRequestController>(ConsumeRequestController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
