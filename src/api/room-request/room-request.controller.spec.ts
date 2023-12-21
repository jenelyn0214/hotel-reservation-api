import { Test, TestingModule } from '@nestjs/testing';

import { RoomRequestController } from './room-request.controller';
import { RoomRequestService } from './room-request.service';

describe('RoomRequestController', () => {
  let controller: RoomRequestController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RoomRequestController],
      providers: [RoomRequestService],
    }).compile();

    controller = module.get<RoomRequestController>(RoomRequestController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
