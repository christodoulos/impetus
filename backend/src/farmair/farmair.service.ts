import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FarmAIr, FarmAIrDocument } from './farmair.schema';
import { Model } from 'mongoose';
import { FarmAIrDTO } from './farmair.dto';

@Injectable()
export class FarmairService {
  constructor(
    @InjectModel(FarmAIr.name) private farmairModel: Model<FarmAIrDocument>,
  ) {}

  async addScan(scan: FarmAIrDTO): Promise<FarmAIr> {
    const createdScan = new this.farmairModel(scan);
    return createdScan.save();
  }
}
