import { Test, TestingModule } from '@nestjs/testing';
import { FarmairService } from './farmair.service';

describe('FarmairService', () => {
  let service: FarmairService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FarmairService],
    }).compile();

    service = module.get<FarmairService>(FarmairService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
