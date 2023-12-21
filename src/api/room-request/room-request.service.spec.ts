import { Test, TestingModule } from '@nestjs/testing';

import { RoomRequestService } from './room-request.service';

describe('RoomRequestService', () => {
  let service: RoomRequestService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RoomRequestService],
    }).compile();

    service = module.get<RoomRequestService>(RoomRequestService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
