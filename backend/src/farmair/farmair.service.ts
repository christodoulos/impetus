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
    let existing = await this.farmairModel.findOne({ name: scan.name });
    if (existing) {
      existing = Object.assign(existing, scan);
      return existing.save();
    } else {
      const createdScan = new this.farmairModel(scan);
      return createdScan.save();
    }
  }
}
