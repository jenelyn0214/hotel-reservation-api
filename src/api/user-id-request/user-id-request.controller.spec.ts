import { Test, TestingModule } from '@nestjs/testing';

import { UserIDRequestController } from './user-id-request.controller';
import { UserIDRequestService } from './user-id-request.service';

describe('UserIDRequestController', () => {
  let controller: UserIDRequestController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserIDRequestController],
      providers: [UserIDRequestService],
    }).compile();

    controller = module.get<UserIDRequestController>(UserIDRequestController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
