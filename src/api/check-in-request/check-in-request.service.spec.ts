import { Test, TestingModule } from '@nestjs/testing';

import { CheckInRequestService } from './check-in-request.service';

describe('CheckInRequestService', () => {
  let service: CheckInRequestService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CheckInRequestService],
    }).compile();

    service = module.get<CheckInRequestService>(CheckInRequestService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
