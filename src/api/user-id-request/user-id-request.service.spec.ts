import { Test, TestingModule } from '@nestjs/testing';

import { UserIDRequestService } from './user-id-request.service';

describe('UserIDRequestService', () => {
  let service: UserIDRequestService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserIDRequestService],
    }).compile();

    service = module.get<UserIDRequestService>(UserIDRequestService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
