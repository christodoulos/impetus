import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { FarmairService } from './farmair.service';
import { FarmairController } from './farmair.controller';
import { FarmAIr, FarmAIrSchema } from './farmair.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'farmair', schema: FarmAIrSchema }]),
  ],
  providers: [FarmairService],
  controllers: [FarmairController],
})
export class FarmairModule {}
