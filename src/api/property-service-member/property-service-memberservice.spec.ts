import { Test, TestingModule } from '@nestjs/testing';

import { PropertyServiceMemberService } from './property-service-member.service';

describe('PropertyServiceMemberService', () => {
  let service: PropertyServiceMemberService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PropertyServiceMemberService],
    }).compile();

    service = module.get<PropertyServiceMemberService>(
      PropertyServiceMemberService,
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
