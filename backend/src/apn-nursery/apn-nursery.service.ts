import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ApnPLC, ApnPLCDocument } from './apn-nursery.schema';
import { ApnPLCDTO } from './apn-nursery.dto';

@Injectable()
export class ApnNurseryService {
  constructor(
    @InjectModel(ApnPLC.name) private apnPLCModel: Model<ApnPLCDocument>,
  ) {}

  async getPLCMetrics(limit: number): Promise<ApnPLC[]> {
    const metrics = await this.apnPLCModel
      .find()
      .sort({ ts: -1 })
      .limit(limit)
      .exec();
    return metrics;
  }
}
