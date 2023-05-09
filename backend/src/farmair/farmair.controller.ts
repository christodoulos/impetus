import { Body, Controller, Post } from '@nestjs/common';
import { FarmairService } from './farmair.service';
import { FarmAIrDTO } from './farmair.dto';

@Controller('farmair')
export class FarmairController {
  constructor(private readonly service: FarmairService) {}

  @Post()
  async farmair_experiment_write(@Body() body: { data: FarmAIrDTO }) {
    console.log(body.data);
    return await this.service.addExperiment(body.data);
  }
}
