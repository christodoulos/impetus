import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { FarmairService } from './farmair.service';
import { FarmAIrDTO } from './farmair.dto';

@Controller('farmair')
export class FarmairController {
  constructor(private readonly service: FarmairService) {}

  @Post()
  async farmairPostScan(@Body() data: FarmAIrDTO) {
    return await this.service.addScan(data);
  }

  @Get('/vineyard/:name')
  async farmairGetScan(@Param('name') name: string) {
    const vineyard = await this.service.getScan(name);
    console.log(vineyard);
    return vineyard;
  }
}
