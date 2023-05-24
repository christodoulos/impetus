import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApnNurseryService } from './apn-nursery.service';
import { ApnPLCDTO } from './apn-nursery.dto';

@Controller('apn-nursery')
export class ApnNurseryController {
  constructor(private readonly service: ApnNurseryService) {}

  @Get('metrics/:limit')
  async apnNurseryGetMetrics(@Param('limit') limit: number) {
    const metrics = await this.service.getPLCMetrics(limit);
    return metrics;
  }
}
