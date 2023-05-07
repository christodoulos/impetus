import { Test, TestingModule } from '@nestjs/testing';
import { FarmairController } from './farmair.controller';

describe('FarmairController', () => {
  let controller: FarmairController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FarmairController],
    }).compile();

    controller = module.get<FarmairController>(FarmairController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
