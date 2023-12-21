import { Test, TestingModule } from '@nestjs/testing';

import { ConsumeRequestService } from './consume-request.service';

describe('ConsumeRequestService', () => {
  let service: ConsumeRequestService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ConsumeRequestService],
    }).compile();

    service = module.get<ConsumeRequestService>(ConsumeRequestService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
