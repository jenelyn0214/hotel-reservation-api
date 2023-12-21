import { Test, TestingModule } from '@nestjs/testing';

import { BUXService } from './bux.service';

describe('BUXService', () => {
  let service: BUXService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BUXService],
    }).compile();

    service = module.get<BUXService>(BUXService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
