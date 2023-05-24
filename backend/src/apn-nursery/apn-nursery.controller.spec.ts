import { Test, TestingModule } from '@nestjs/testing';
import { ApnNurseryController } from './apn-nursery.controller';

describe('ApnNurseryController', () => {
  let controller: ApnNurseryController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ApnNurseryController],
    }).compile();

    controller = module.get<ApnNurseryController>(ApnNurseryController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
