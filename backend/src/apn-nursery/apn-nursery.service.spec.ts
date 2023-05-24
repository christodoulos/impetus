import { Test, TestingModule } from '@nestjs/testing';
import { ApnNurseryService } from './apn-nursery.service';

describe('ApnNurseryService', () => {
  let service: ApnNurseryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ApnNurseryService],
    }).compile();

    service = module.get<ApnNurseryService>(ApnNurseryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
