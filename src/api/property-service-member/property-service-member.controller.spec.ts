import { Test, TestingModule } from '@nestjs/testing';

import { PropertyServiceMemberController } from './property-service-member.controller';
import { PropertyServiceMemberService } from './property-service-member.service';

describe('PropertyServiceMemberController', () => {
  let controller: PropertyServiceMemberController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PropertyServiceMemberController],
      providers: [PropertyServiceMemberService],
    }).compile();

    controller = module.get<PropertyServiceMemberController>(
      PropertyServiceMemberController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
